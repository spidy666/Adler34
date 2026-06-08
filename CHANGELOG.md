# Changelog

All notable changes to **34-0 — Eintracht Frankfurt Bundesliga Dream Team** are documented here.

---

## [0.10.0] — 2026-06-08

### Added
- **Per-opponent difficulty modifiers** — each of the 17 Bundesliga opponents now has a strength rating that shifts the win probability for that individual game
  - Bayern München: −0.22 to winProb (hardest opponent)
  - BVB / Leverkusen / Leipzig: −0.14 to −0.15
  - Stuttgart / M'gladbach: −0.07 to −0.08
  - Augsburg / Köln / HSV / Hertha / Schalke: up to +0.03 (easier opponents)
  - Previously every game used the same flat probability regardless of opponent — a weak OOP squad would beat Bayern as often as Schalke, which was unrealistic
  - `gameWin` is clamped to [0.04, 0.76] so upsets remain possible but a weak squad has almost no chance vs the top four

---

## [0.9.0] — 2026-06-08

### Changed
- **Three-tier position compatibility system** replaces the old binary compatible/incompatible model
  - **Green** = player's natural position exactly matches the slot — no penalty (factor 1.0)
  - **Yellow** = slot is in the player's historically documented `altPositions` array — small penalty (factor 0.88, −12 %)
  - **Red** = no match at all — hefty penalty (factor 0.65, −35 %)
  - Removed `POS_COMPAT` broad-compatibility matrix. Slot colour is now derived purely from each player's individual `position` and `altPositions` data, not a generic positional adjacency table
  - Draft filter (click a slot during deal phase) now shows green cards (main fit), yellow cards (alt fit), and dims non-fitting players
  - `positionFit` property (`'main'` | `'alt'` | `'out'`) replaces the old boolean `inPosition` flag
  - Engine penalty increased for fully incompatible placements (was 25 %, now 35 %)

---

## [0.8.0] — 2026-06-08

### Fixed
- **Position table calibrated to real Bundesliga standings (2014/15–2023/24)**
  - 43 pts now correctly maps to ~9th place (was incorrectly showing 6th)
  - 73 pts maps to 2nd place (Stuttgart's 2023/24 result)
  - 40 pts maps to 10th place
  - Full ladder: 78+ → 1st, 68+ → 2nd, 60+ → 3rd, 55+ → 4th, 50+ → 5th, 45+ → 6th, 41+ → 8th, 37+ → 10th, 32+ → 12th, 27+ → 14th, 22+ → 16th (Playoff), 16+ → 17th (Abstieg)
  - Updated `isEuropa` threshold (50 pts) and `isRelegated` threshold (<27 pts) to match

---

## [0.7.0] — 2026-06-08

### Fixed
- **`POS_COMPAT` tightened** — previous matrix was far too permissive, causing most OOP placements to show green (compatible) and receive no engine penalty
  - `MF` was compatible with RW, LW, RB, LB — now only DM and AM
  - `RB`/`LB` were compatible with MF — now fullbacks only swap among RB/CB/LB
  - `CF` was compatible with RW/LW — now only stretches to AM
  - `RW`/`LW` were compatible with MF and CF — now only AM and the opposite wing
  - Individual player `altPositions` in `players.js` handle real historical flexibility beyond these defaults

---

## [0.6.0] — 2026-06-08

### Fixed
- **Engine now uses slot position weights** — the fundamental fix for the out-of-position exploit
  - Previously: engine used `player.position` (natural role) for `POSITION_WEIGHTS` regardless of where the player was placed. Two CFs placed as defenders still scored as CFs (attack weight 2.5 each)
  - Now: engine uses `slot.pos` (where they actually play). A CF in the GK slot is scored with GK weights — high defence requirement, near-zero attack
  - `slotPos` is now passed from the simulate handler alongside `inPosition`
  - OOP penalty increased to 25 % (was 18 %)
  - Win probability formula updated: `0.12 × totalPower − 0.63`

---

## [0.5.0] — 2026-06-08

### Fixed
- **Simulation engine recalibrated** after further over-easy results (54 pts with mostly OOP squad)
  - `goalBonus` multiplier reduced from ×0.20 to ×0.04 (max attack multiplier ×1.12 instead of ×1.60)
  - `appBonus` multiplier reduced from ×0.10 to ×0.02 (max midfield multiplier ×1.04 instead of ×1.20)
  - Frankfurt players all have high career stats so large bonuses inflated everyone equally — the bonuses no longer dominate the score
  - Added 18 % rating penalty (`posFactor = 0.82`) for players placed outside their compatible positions
  - `inPosition` flag passed from `index.html` simulate handler using `playerFitsSlot(player, slot.pos)`
  - Era diversity bonus range tightened from 0.85–1.05 to 0.90–1.04
  - Updated `estimatePosition` and result thresholds

---

## [0.4.0] — 2026-06-08

### Fixed
- **Critical engine bug: game was unwinnable to lose**
  - `winProb = 0.18 + 0.09 × totalPower` with typical squad power of 7–10 produced values of 0.81–1.08
  - Capped at 0.88 with `drawProb = 0.18` → `lossProb = −0.06` (negative) → team could never lose
  - Even a 74-rated single-era squad was getting 29+ wins per season
  - **Fix**: new formula `min(0.68, max(0.18, 0.07 × totalPower − 0.14))`, `drawProb` raised to 0.22
  - `lossProb` is now always positive; max win probability capped at 68 %

---

## [0.3.0] — 2026-06-08

### Added
- **German position labels throughout** — player cards now show `TW`, `IV`, `RV`, `LV`, `DM`, `MF`, `OM`, `RA`, `LA`, `ST` instead of English codes (`GK`, `CB`, `RB`, etc.)
- **Alt positions visible in draft cards** — secondary positions shown in a small label next to the primary (also in German)
- **Slot click filter during draft** — clicking an empty pitch slot in deal mode highlights compatible players (green border) and dims incompatible ones. Click again to clear
- `POS_DE` mapping object and `posDE()` helper function
- `playerFitsSlot()` now checks both main position and `altPositions` for compatibility
- CSS classes: `.slot-active`, `.slot-match`, `.slot-dim`
- **Compatible slot check extended to `altPositions`** — `renderPitch` in place mode now correctly shows green for players whose alt positions fit the target slot

---

## [0.2.0] — 2026-06-07

### Added
- **100-player database** — 24 new historically verified players added, focusing on high-appearance SGE players not previously included:
  - 1960s: Wolfgang Solz (CF), Karl-Heinz Wirth (CB)
  - 1970s: Peter Kunter (GK, *"der fliegende Zahnarzt"*), Gert Trinklein (CB), Thomas Rohrbach (MF), Peter Reichel (CB), Wolfgang Kraus (MF), Roland Weidle (MF), Helmut Müller (MF), Rüdiger Wenzel (CF)
  - 1980s: Frank Poth (RB), Werner Lorant (DM), Bernd Tretter (CF), Ralf Sievers (MF)
  - 1990s: Stefan Studer (MF), Dietmar Roth (CB, 264 BL apps), Slobodan Komljenović (CB)
  - 2000s: Alexander Schur (AM), Jermaine Jones (DM), Benjamin Köhler (AM)
  - 2010s: Sebastian Jung (RB), Bastian Oczipka (LB), Michael Fink (MF)
  - 2020s: Djibril Sow (DM)

### Fixed
- Removed 4 non-Frankfurt players incorrectly included in the database: Marc Ziegler, Rainer Zietsch, Bernd Krauss, Jan Šimák
- Corrected historical data for Uli Stein (activeFrom corrected to 1987), Axel Kruse (joined Jan 1991 from Hertha BSC, decade corrected to 1990s), Ralf Weber (joined Aug 1989 from Kickers Offenbach), Dieter Stinka (left for Darmstadt 98 after 1965/66)

---

## [0.1.0] — 2026-06-06

### Added
- Initial release
- Formation selector: 4-4-2, 4-3-3, 4-2-3-1, 3-5-2, 5-3-2, 4-1-4-1
- Draft system: season-based player pools, decade diversity bias, deal/place two-phase state machine
- Pitch rendering with compatible/incompatible slot colours
- `SGE_SEASONS` array covering all 59 Bundesliga seasons Frankfurt participated in (gaps for 1996–1997 and 2011–2012 relegation periods)
- Season simulation engine (`data/engine.js`) with seeded RNG, opponent list, match ticker
- 76-player initial database covering 6 decades of SGE Bundesliga history
- Era diversity bonus system (0.85–1.05 multiplier)
- Balance penalty for heavily lopsided squads
