# 34-0 — Eintracht Frankfurt Bundesliga Dream Team

Build the greatest Eintracht Frankfurt XI of all time and simulate a complete 34-game Bundesliga season. Can you win the title with a squad spanning the club's entire Bundesliga history?

**Live:** [spidy666.github.io/Adler34](https://spidy666.github.io/Adler34) *(or run locally — see below)*

> Inspired by [82-0.com](https://www.82-0.com/), [38-0.app](https://38-0.app/game), and similar dream-team builders for other leagues.

---

## How to Play

1. **Choose a formation** — six classic shapes available (4-4-2, 4-3-3, 4-2-3-1, 3-5-2, 5-3-2, 4-1-4-1)
2. **Draft your squad** — each round deals you a full season's worth of Frankfurt players. Pick one; the rest are discarded
3. **Place players on the pitch** — click a card, then click an empty slot
   - **Green slot** = player's natural (main) position — no penalty
   - **Yellow slot** = one of the player's historically documented alternate positions — small penalty (~12 %)
   - **Red slot** = incompatible position — hefty penalty (~35 %)
   - **Tip:** click an empty pitch slot *before* selecting a card to highlight every player who fits that position — green border for main fit, gold border for alternate fit, dimmed for incompatible
4. **Fill all 11 positions**, then click **SAISON SIMULIEREN**
5. Watch all 34 match results appear one by one (or click **ÜBERSPRINGEN** to skip). Each result shows the scorer name(s) and minute(s) when Frankfurt scored. After the final match, your points, goal difference, and finishing position are revealed
   - Click **KADER ANZEIGEN** to review your squad — sorted goalkeeper-first, with each player's season goal tally alongside their rating. Position fit is colour-coded: green (main), yellow (alternate), red (out of position)

### Scoring tips
- **Era diversity matters** — a squad drawn from 4+ decades gets a chemistry bonus; single-era squads are penalised
- **Position placement matters** — the engine scores each player using the weights of the slot they occupy, not their natural position. A striker in goal contributes as a (bad) goalkeeper
- **Balance matters** — a squad heavily skewed toward attack or defence is penalised relative to a balanced side

---

## How the Simulation Works

Each player's contribution is calculated across three dimensions using their **slot position** (where they actually play, not their natural position):

| Dimension | Main contributors |
|-----------|------------------|
| Attack | CF, RW, LW, AM — weighted by goals |
| Midfield | MF, DM, AM — weighted by appearances |
| Defence | GK, CB, RB, LB, DM — weighted by position |

The three scores feed a **power rating** modified by:
- **Balance penalty** — heavily lopsided squads (e.g. all attackers) take up to a 25 % penalty
- **Era diversity bonus** — squads from 1–6 different decades get a multiplier from 0.90 to 1.04
- **Three-tier position penalty** — main position: 100 % effectiveness; historically documented alternate position: 88 %; fully incompatible: 65 %

The power rating drives a **base win probability** (max 70 %), which is then adjusted per game by opponent difficulty — beating Bayern München is substantially harder than beating Bochum. Results are deterministic per squad (seeded RNG), so the same XI always produces the same table. Win scores always have more Frankfurt goals than opponent goals; draw scores are always equal; loss scores always have fewer — ties like 1:1 only appear as draws. Opponents are drawn from the Bundesliga eternal table (transfermarkt.de) — all 17 opponents have at least 884 Bundesliga seasons of history.

### Finishing position thresholds *(calibrated to Bundesliga 2014/15–2023/24)*

| Points | Position |
|--------|----------|
| 78+ | 🥇 1. Platz — Meister |
| 68–77 | 2. Platz |
| 60–67 | 3. Platz |
| 55–59 | 4. Platz (Champions League) |
| 50–54 | 5. Platz (Europa League) |
| 45–49 | 6. Platz (Europa League) |
| 41–44 | 8. Platz |
| 37–40 | 10. Platz |
| 32–36 | 12. Platz |
| 27–31 | 14. Platz |
| 22–26 | 16. Platz (Relegations-Playoff) |
| 16–21 | 17. Platz (Abstieg) |
| < 16 | 18. Platz (Abstieg) |

---

## Player Database

**102 historical SGE players** covering all six Bundesliga decades the club has competed in, from the inaugural 1963/64 season to 2024/25. Only players with meaningful Bundesliga careers at Frankfurt are included. Every decade has at least 13 players, guaranteeing a full unique deal every round.

| Decade | Players | Notable players |
|--------|---------|----------------|
| **1960s** | 14 | Egon Loy, Alfred Pfaff, Erwin Stein, Jürgen Grabowski, Fahrudin Jusufi, Wolfgang Solz, Dieter Stinka |
| **1970s** | 18 | Bernd Hölzenbein, Karl-Heinz Körbel, Bernd Nickel, Jürgen Pahl, Peter Kunter, Gert Trinklein, Helmut Müller, Werner Lorant |
| **1980s** | 13 | Cha Bum-kun, Bruno Pezzey, Uwe Bein, Andreas Köpke, Frank Poth, Bernd Tretter, Ralf Sievers, Uli Stein, Manfred Binz |
| **1990s** | 13 | Tony Yeboah, Jay-Jay Okocha, Andreas Möller, Axel Kruse, Dietmar Roth, Slobodan Komljenović, Ralf Weber, Thomas Sobotzik, Horst Heldt |
| **2000s** | 13 | Alexander Meier, Marco Russ, Pirmin Schwegler, Jermaine Jones, Alexander Schur, Benjamin Köhler |
| **2010s** | 18 | Kevin Trapp, Filip Kostić, André Silva, Daichi Kamada, Sebastian Jung, Bastian Oczipka, Marc Stendera |
| **2020s** | 13 | Djibril Sow, Mario Götze, Omar Marmoush, Rafael Borré, Ansgar Knauff |

Each player object includes:
- Rating (70–92), Bundesliga appearances and goals at SGE
- Active seasons at the club (`activeFrom` / `activeTo` as Bundesliga season start years)
- Primary position (German label) and historically documented `altPositions`
- Career bio and peak trophy

---

## Project Structure

```
Adler34/
├── index.html        ← All UI, game logic, formations, draft engine
├── data/
│   ├── players.js    ← Player database (99 players, ES module)
│   └── engine.js     ← 34-game season simulation engine
├── CHANGELOG.md
└── README.md
```

No build step, no framework, no dependencies. Pure vanilla JS with ES modules.

---

## Running Locally

The game uses ES Modules (`import/export`) and **cannot** be opened by double-clicking `index.html`. Use any local HTTP server:

**VS Code Live Server** (easiest)
1. Install the *Live Server* extension by Ritwick Dey
2. Right-click `index.html` → **Open with Live Server**

**Python**
```bash
python3 -m http.server 8080
# open http://localhost:8080
```

**Node**
```bash
npx serve .
```

---

## Data Sources

Player statistics sourced and cross-referenced from:
- Bundesliga official records
- Wikipedia — *List of Eintracht Frankfurt players*, individual season articles
- worldfootball.net squad archives
- transfermarkt.de career histories
- history.eintracht.de (SGE official club history)
