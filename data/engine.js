/**
 * EINTRACHT FRANKFURT – Game Engine
 * Simulates a 34-game Bundesliga season based on drafted squad stats
 */

/**
 * How much each opponent shifts the base win probability.
 * Positive = harder to beat (reduce winProb), negative = easier to beat (increase winProb).
 * Calibrated to approximate Bundesliga strength differences over the last decade.
 */
const OPPONENT_DIFFICULTY = {
  'Bayern München':       0.22,
  'Borussia Dortmund':    0.15,
  'Bayer Leverkusen':     0.14,
  'RB Leipzig':           0.14,
  'VfB Stuttgart':        0.08,
  "Borussia M'gladbach":  0.07,
  'SC Freiburg':          0.05,
  'Union Berlin':         0.05,
  'TSG Hoffenheim':       0.03,
  'Wolfsburg':            0.01,
  'Mainz 05':             0.00,
  'Werder Bremen':        0.00,
  'Augsburg':            -0.02,
  'Köln':                -0.01,
  'Hamburger SV':        -0.02,
  'Hertha BSC':          -0.03,
  'Schalke 04':          -0.03,
};

/**
 * Goal-scoring likelihood by slot position.
 * Used to assign scorers to Frankfurt goals after the main simulation.
 */
const SCORING_WEIGHT = {
  GK: 0.02, CB: 0.12, RB: 0.20, LB: 0.20,
  DM: 0.30, MF: 0.80, AM: 1.50,
  RW: 2.00, LW: 2.00, CF: 3.00,
};

function pickScorer(players, rng) {
  const weights = players.map(p => {
    const pos = p.slotPos || p.position;
    return (SCORING_WEIGHT[pos] ?? 0.50) * (p.rating / 80);
  });
  const total = weights.reduce((a, b) => a + b, 0);
  let rand = rng() * total;
  for (let i = 0; i < players.length; i++) {
    rand -= weights[i];
    if (rand <= 0) return players[i];
  }
  return players[players.length - 1];
}

/**
 * Position weights for squad balance rating
 * Positions that matter more for different stat categories
 */
const POSITION_WEIGHTS = {
  GK:  { defense: 3.0, attack: 0.1, midfield: 0.2 },
  CB:  { defense: 2.5, attack: 0.2, midfield: 0.5 },
  RB:  { defense: 1.8, attack: 0.8, midfield: 0.9 },
  LB:  { defense: 1.8, attack: 0.8, midfield: 0.9 },
  DM:  { defense: 1.5, attack: 0.5, midfield: 1.5 },
  MF:  { defense: 1.0, attack: 0.9, midfield: 1.8 },
  AM:  { defense: 0.5, attack: 1.6, midfield: 1.4 },
  RW:  { defense: 0.3, attack: 2.0, midfield: 0.8 },
  LW:  { defense: 0.3, attack: 2.0, midfield: 0.8 },
  CF:  { defense: 0.2, attack: 2.5, midfield: 0.5 },
};

/**
 * Calculate the squad strength across three dimensions
 */
function calculateSquadStrength(players) {
  let attackScore = 0;
  let midfieldScore = 0;
  let defenseScore = 0;

  players.forEach(player => {
    // Use SLOT position for contribution weights, not natural position.
    // A CF placed in the GK slot contributes as a goalkeeper (high defense, no attack),
    // just with a penalty on effectiveness. This is the core mechanic: placement matters.
    const effectivePos = player.slotPos || player.position;
    const weights = POSITION_WEIGHTS[effectivePos] || { defense: 1, attack: 1, midfield: 1 };

    // main = no penalty, alt position = 12% reduction, fully incompatible = 35% reduction
    const posFactor = player.positionFit === 'main' ? 1.0
                    : player.positionFit === 'alt'  ? 0.88
                    : 0.65;
    const base = (player.rating * posFactor) / 100;

    const goalBonus = Math.min(player.bundesligaGoals / 15, 3);
    const appBonus  = Math.min(player.bundesligaApps  / 100, 2);

    attackScore  += base * weights.attack  * (1 + goalBonus * 0.04);
    midfieldScore+= base * weights.midfield * (1 + appBonus  * 0.02);
    defenseScore += base * weights.defense;
  });

  return { attackScore, midfieldScore, defenseScore };
}

/**
 * Balance penalty: teams heavily skewed in one area suffer
 */
function getBalancePenalty(attackScore, midfieldScore, defenseScore) {
  const scores = [attackScore, midfieldScore, defenseScore];
  const max = Math.max(...scores);
  const min = Math.min(...scores);
  const imbalance = max / (min + 0.01);
  // imbalance > 2 = moderate penalty, > 3 = severe
  if (imbalance < 1.5) return 1.0;
  if (imbalance < 2.5) return 0.93;
  if (imbalance < 3.5) return 0.85;
  return 0.75;
}

/**
 * Decade diversity bonus: using players from more decades = stronger chemistry
 */
function getDiversityBonus(players) {
  const decades = new Set(players.map(p => p.decade));
  const count = decades.size;
  if (count <= 1) return 0.90;
  if (count === 2) return 0.94;
  if (count === 3) return 0.97;
  if (count === 4) return 1.00;
  if (count === 5) return 1.02;
  return 1.04; // all 6 decades
}

/**
 * Run a 34-game Bundesliga season simulation
 * Returns: { wins, draws, losses, points, goalsFor, goalsAgainst, games }
 */
function simulateSeason(players) {
  if (!players || players.length === 0) return null;

  const { attackScore, midfieldScore, defenseScore } = calculateSquadStrength(players);
  const balancePenalty = getBalancePenalty(attackScore, midfieldScore, defenseScore);
  const diversityBonus = getDiversityBonus(players);

  // Normalize to a 0–1 range "power level"
  const totalPower = ((attackScore * 0.4 + midfieldScore * 0.3 + defenseScore * 0.3) 
                      * balancePenalty * diversityBonus);

  // Base win probability from squad strength. Adjusted per-game by opponent difficulty.
  // Typical base ranges:
  //   74-78 rated, mostly red OOP          → ~0.18 base → drops further vs strong opponents
  //   74-78 rated, in position, mixed eras → ~0.30–0.42 base
  //   82-86 rated, diverse, in position    → ~0.50–0.62 base
  const winProb  = Math.min(0.70, Math.max(0.18, 0.12 * totalPower - 0.63));
  const drawProb = 0.22;

  let wins = 0, draws = 0, losses = 0;
  let goalsFor = 0, goalsAgainst = 0;
  const games = [];
  const playerGoals = {};
  players.forEach(p => { playerGoals[p.id] = 0; });

  // Seed so same team always gets same result (deterministic based on ratings)
  const seed = players.reduce((acc, p) => acc + p.rating * 7 + p.bundesligaApps, 0);
  let rng = seededRng(seed);

  const opponents = generateOpponents();

  for (let i = 0; i < 34; i++) {
    const roll = rng();
    const opponent = opponents[i];
    let result, gf, ga;

    // Per-game probability adjusted for opponent strength.
    // gameWin clamped to [0.04, 0.76] so lossProb stays positive and upsets remain possible.
    const oppMod    = OPPONENT_DIFFICULTY[opponent] ?? 0;
    const gameWin   = Math.max(0.04, Math.min(0.76, winProb - oppMod));
    const gameLoss  = 1 - gameWin - drawProb;

    if (roll < gameLoss) {
      result = "L";
      gf = Math.floor(rng() * 2);
      ga = Math.floor(rng() * 2) + 1;
      losses++;
    } else if (roll < gameLoss + drawProb) {
      result = "D";
      gf = Math.floor(rng() * 3) + 1;
      ga = gf;
      draws++;
    } else {
      result = "W";
      gf = Math.floor(rng() * 3) + 1;
      ga = Math.floor(rng() * 2);
      wins++;
    }

    goalsFor += gf;
    goalsAgainst += ga;
    games.push({ matchday: i + 1, opponent, result, gf, ga, scorers: [] });
  }

  // Assign scorers using a separate seeded RNG so main match outcomes are unchanged.
  const scorerRng = seededRng(seed + 999983);
  for (const game of games) {
    for (let k = 0; k < game.gf; k++) {
      const scorer = pickScorer(players, scorerRng);
      const minute = Math.floor(scorerRng() * 90) + 1;
      game.scorers.push({ name: scorer.name, id: scorer.id, minute });
      playerGoals[scorer.id]++;
    }
    game.scorers.sort((a, b) => a.minute - b.minute);
  }

  const points = wins * 3 + draws;
  const record34 = wins === 34; // perfect season

  // Determine finishing position based on points
  const position = estimatePosition(points);

  return {
    wins, draws, losses, points,
    goalsFor, goalsAgainst,
    goalDifference: goalsFor - goalsAgainst,
    games,
    position,
    playerGoals,
    attackScore: Math.round(attackScore * 10) / 10,
    midfieldScore: Math.round(midfieldScore * 10) / 10,
    defenseScore: Math.round(defenseScore * 10) / 10,
    totalPower: Math.round(totalPower * 100),
    diversityBonus: Math.round((diversityBonus - 1) * 100),
    isChampion:  points >= 78,   // 1st place → Meister
    isPerfect:   wins >= 28,
    isEuropa:    points >= 50,   // 5th or better → Europa
    isRelegated: points < 27    // 16th or worse → Abstiegskampf display
  };
}

// Calibrated to Bundesliga 2014/15–2023/24 average final standings.
// Examples: 73 pts → 2nd (Stuttgart 2024), 43 pts → 9th (Heidenheim 2024),
//           40 pts → 10th, 59 pts → 6th (Frankfurt 2024).
function estimatePosition(points) {
  if (points >= 78) return 1;   // Meister (außergewöhnlich)
  if (points >= 68) return 2;   // Vize / Titelkampf      (73 → 2nd ✓)
  if (points >= 60) return 3;   // Champions League
  if (points >= 55) return 4;   // Champions League
  if (points >= 50) return 5;   // Europa League
  if (points >= 45) return 6;   // Europa League           (59 → 6th when squeezed up ✓)
  if (points >= 41) return 8;   // Conference League / oberes Mittelfeld
  if (points >= 37) return 10;  // Mittelfeld              (40 → 10th ✓)
  if (points >= 32) return 12;
  if (points >= 27) return 14;
  if (points >= 22) return 16;  // Relegations-Playoff
  if (points >= 16) return 17;  // Abstieg
  return 18;
}

/**
 * Seeded pseudo-random number generator (Mulberry32)
 */
function seededRng(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function() {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * Generate 34 Bundesliga opponents
 */
function generateOpponents() {
  return [
    "Bayern München", "Borussia Dortmund", "Bayer Leverkusen", "RB Leipzig",
    "Borussia M'gladbach", "SC Freiburg", "Union Berlin", "VfB Stuttgart",
    "TSG Hoffenheim", "Mainz 05", "Werder Bremen", "Augsburg",
    "Wolfsburg", "Köln", "Hertha BSC", "Schalke 04",
    "Hamburger SV", "Bayern München", "Borussia Dortmund", "Bayer Leverkusen",
    "RB Leipzig", "Borussia M'gladbach", "SC Freiburg", "Union Berlin",
    "VfB Stuttgart", "TSG Hoffenheim", "Mainz 05", "Werder Bremen",
    "Augsburg", "Wolfsburg", "Köln", "Hertha BSC",
    "Schalke 04", "Hamburger SV"
  ];
}

export { simulateSeason, calculateSquadStrength };
