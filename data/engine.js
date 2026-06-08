/**
 * EINTRACHT FRANKFURT – Game Engine
 * Simulates a 34-game Bundesliga season based on drafted squad stats
 */

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
    const pos = player.position;
    const weights = POSITION_WEIGHTS[pos] || { defense: 1, attack: 1, midfield: 1 };
    const base = player.rating;

    // Goals and apps contribute to attack/midfield
    const goalBonus = Math.min(player.bundesligaGoals / 15, 3);
    const appBonus = Math.min(player.bundesligaApps / 100, 2);

    attackScore  += (base / 100) * weights.attack  * (1 + goalBonus * 0.2);
    midfieldScore+= (base / 100) * weights.midfield * (1 + appBonus * 0.1);
    defenseScore += (base / 100) * weights.defense;
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
  if (count <= 1) return 0.85;
  if (count === 2) return 0.92;
  if (count === 3) return 0.97;
  if (count === 4) return 1.00;
  if (count === 5) return 1.03;
  return 1.05; // all 6 decades
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

  // Convert to win probability per game (non-linear curve)
  // Perfect team ~= winProb 0.85, average ~= 0.45, terrible ~= 0.20
  const winProb = Math.min(0.88, Math.max(0.15, 0.18 + 0.09 * totalPower));
  const drawProb = 0.18;
  const lossProb = 1 - winProb - drawProb;

  let wins = 0, draws = 0, losses = 0;
  let goalsFor = 0, goalsAgainst = 0;
  const games = [];

  // Seed so same team always gets same result (deterministic based on ratings)
  const seed = players.reduce((acc, p) => acc + p.rating * 7 + p.bundesligaApps, 0);
  let rng = seededRng(seed);

  const opponents = generateOpponents();

  for (let i = 0; i < 34; i++) {
    const roll = rng();
    const opponent = opponents[i];
    let result, gf, ga;

    if (roll < lossProb) {
      result = "L";
      gf = Math.floor(rng() * 2);
      ga = Math.floor(rng() * 2) + 1;
      losses++;
    } else if (roll < lossProb + drawProb) {
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
    games.push({ matchday: i + 1, opponent, result, gf, ga });
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
    attackScore: Math.round(attackScore * 10) / 10,
    midfieldScore: Math.round(midfieldScore * 10) / 10,
    defenseScore: Math.round(defenseScore * 10) / 10,
    totalPower: Math.round(totalPower * 100),
    diversityBonus: Math.round((diversityBonus - 1) * 100),
    isChampion: points >= 68,
    isPerfect: points === 102,
    isEuropa: points >= 54,
    isRelegated: points < 34
  };
}

function estimatePosition(points) {
  if (points >= 80) return 1;
  if (points >= 73) return 2;
  if (points >= 66) return 3;
  if (points >= 60) return 4;
  if (points >= 54) return 5;
  if (points >= 48) return 6;
  if (points >= 42) return 7;
  if (points >= 36) return 10;
  if (points >= 34) return 14;
  if (points >= 28) return 16;
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
