# 34-0 — Eintracht Frankfurt Bundesliga Dream Team Game

Build the greatest Eintracht Frankfurt XI of all time and simulate a complete 34-game Bundesliga season.

## Inspired by
- [82-0.com](https://www.82-0.com/) — NBA all-time team builder
- [38-0.app](https://38-0.app/game) — Premier League dream XI
- Similar games for La Liga, Brasileirão, etc.

---

## How to Run Locally

### Option 1: VS Code Live Server (recommended)

1. Open the `eintracht-game/` folder in **Visual Studio Code**
2. Install the **Live Server** extension (by Ritwick Dey)
3. Right-click `index.html` → **"Open with Live Server"**
4. The game opens in your browser at `http://127.0.0.1:5500`

### Option 2: Python (no extensions needed)

```bash
cd eintracht-game
python3 -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

### Option 3: Node.js

```bash
cd eintracht-game
npx serve .
```

> ⚠️ **Important**: The game uses ES Modules (`import/export`), so it **cannot** be opened by double-clicking `index.html` directly. You need a local server (any of the above work).

---

## Project Structure

```
eintracht-game/
├── index.html          ← Main game (all UI + game logic)
├── data/
│   ├── players.js      ← Complete player database (40 players, 6 decades)
│   └── engine.js       ← Season simulation engine
└── README.md
```

---

## Player Database

**40 historical SGE players** across all 6 Bundesliga decades:

| Decade | Key Players |
|--------|------------|
| **1960s** | Egon Loy (GK), Alfred Pfaff (AM), Erwin Stein (CF), Jürgen Grabowski (RW), Fahrudin Jusufi (RB) |
| **1970s** | Bernd Hölzenbein (LW), Karl-Heinz Körbel (CB), Bernd Nickel (AM), Jürgen Pahl (GK), Willi Neuberger (RB) |
| **1980s** | Cha Bum-kun (CF), Bruno Pezzey (CB), Uwe Bein (AM), Jørn Andersen (CF), Andreas Köpke (GK) |
| **1990s** | Tony Yeboah (CF), Jay-Jay Okocha (AM), Andreas Möller (AM), Uwe Bindewald (MF), Jan Åge Fjørtoft (CF) |
| **2000s** | Alexander Meier (CF), Marco Russ (CB), Pirmin Schwegler (DM), Oka Nikolov (GK) |
| **2010s** | Kevin Trapp (GK), Filip Kostić (LW), André Silva (CF), Daichi Kamada (AM), Luka Jović (CF), Ante Rebić (LW) |

---

## How the Simulation Works

1. **Squad Strength** is calculated across three dimensions:
   - ⚔️ Attack (weighted by goals, position, rating)
   - 🔄 Midfield (weighted by appearances, position, rating)
   - 🛡️ Defense (weighted by position, rating)

2. **Balance Penalty**: Heavily lopsided squads (e.g. all attackers, no defenders) receive a penalty

3. **Diversity Bonus**: Using players from more decades = stronger squad chemistry

4. **34-Game Simulation**: Each matchday is simulated deterministically based on your squad's power level

5. **Outcomes**:
   - 🏆 Champion: 68+ points
   - 🇪🇺 Europa: 54+ points
   - 📊 Mid-table: 34–53 points
   - ⬇️ Relegated: under 34 points
   - ✨ Perfect season: 102 points (34-0-0)

---

## Planned Features (Next Steps)

- [ ] Formation selector (4-4-2, 4-3-3, 3-5-2, etc.)
- [ ] Player image cards
- [ ] Share your squad (URL-encoded)
- [ ] High score leaderboard
- [ ] "HoopIQ mode" — stats hidden, pick from memory
- [ ] More historical detail: match reports, season highlights
- [ ] Mobile swipe gestures

---

## Data Sources

Player statistics sourced from:
- Bundesliga official records
- Wikipedia historical season articles  
- worldfootball.net squad archives
- Bundesliga.com club history features
- Official SGE history museum (history.eintracht.de)
