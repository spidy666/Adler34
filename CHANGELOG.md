# Änderungsprotokoll

Alle wesentlichen Änderungen an **34-0 — Eintracht Frankfurt Bundesliga Dream Team** sind hier dokumentiert.

---

## [0.33.2] — 2026-06-10

### Behoben
- **Frauen-Deal: max. 1 TW pro Runde** — mit 11 Torhüterinnen in einem 69-Spielerinnen-Pool ergaben zufällige Ziehungen regelmäßig 4–5 TW-Angebote; der Frauen-Modus begrenzt TW nun auf 1 pro Deal (Feldspielerinnen füllen die verbleibenden 12 Plätze). Männer-Modus unverändert.
- **Ausweichpositionen für 5 Frauen-Spielerinnen ergänzt** (Quellen: Fotmob, Footballcritic, Soccerdonna):
  - Amanda Ilestedt (IV) → Alt `RV` (Footballcritic: dokumentierte Einsätze als Rechtsverteidigerin)
  - Verena Hanshaw (LV) → Alt `IV` (Fotmob: IV als Nebenposition aufgeführt)
  - Leonie Köster (MF) → Alt `DM` (Soccerdonna: als defensives Mittelfeld registriert)
  - Pernille Sanvig (MF) → Alt `DM` (Fotmob: primär als DM mit ZM als Nebenposition)
  - Lara Prašnikar (ST) → Alt `RA` (Fotmob: Rechtsaußen als Nebenposition dokumentiert)
- Verbleibende Spielerinnen mit leerem `altPositions` haben keine dokumentierte Nebenposition in den geprüften Quellen (Soccerdonna, Fotmob, Footballcritic, Wikipedia)
- **Katharina Rust entfernt** — verifiziert als Spielerin von Eintracht Frankfurt II (2. Frauen-Bundesliga), nicht des Bundesliga-Erstligakaders; keine verifizierten Erstliga-Einsätze

---

## [0.33.1] — 2026-06-10

### Geändert
- **Frauen-BL-Qualifikation korrigiert** — fehlerhafter Europa-Cup-Platz entfernt; entspricht nun den tatsächlichen Wettbewerbsregeln
  - 1. Platz → Champions League (direkte Gruppenphase)
  - 2.–3. Platz → CL-Qualifikationsrunde (`isEuropa`-Schwellenwert auf 48 Punkte angehoben, war 39)
  - Kein direkter Europa-Cup-Platz; Europa Cup ist nur erreichbar, wenn die CL-Qualifikation scheitert (nicht modelliert)
  - Abstieg: untere 2 Teams (13. und 14.) steigen ab; `isRelegated` auf `< 19 Pkt.` angepasst (war `< 20`)
- **Ergebnisbildschirm-Bezeichnungen modusabhängig** — Frauen-Ergebnisse verwenden nun korrekte deutsche weibliche Formen und Wettbewerbsnamen
  - Perfekte Saison: "26 – 0 · MEISTERIN · DIE ADLERINNEN SIND UNBESIEGBAR"
  - 1. Platz: "MEISTERIN · CHAMPIONS LEAGUE"
  - 2. Platz: "VIZEMEISTERIN · CL-QUALIFIKATION"
  - 3. Platz (isEuropa): "CL-QUALIFIKATION" statt "EUROPACUP"
- **Spielanleitung Frauen-Tabelle aktualisiert** — Punktetabelle zeigt nun CL-Qualifikation für 2.–3., Abstieg für 13.–14., kein Europa-Cup-Eintrag

---

## [0.33.0] — 2026-06-10

### Hinzugefügt
- **Bewertungen für alle 69 Frauen-Spielerinnen** — Platzhalter `rating: 0` durch kalibrierte Werte in vier Stufen ersetzt
  - Elite (88–91): Freigang 91, Nüsken/Reuteler 89, Prašnikar 88
  - Stark (84–87): Anyomi 87, Frohms/Dunst 86/87, Johannes/Feiersinger/Kleinherne/Chiba 85, Martinez/Raso/Ilestedt 84
  - Etabliert (77–83): Hanshaw 83, Winkler 83, Hechler/Doorsoun/Kirchberger/Pawollek 82, Santos/Wolter/Gräwe/Senß/Verena 81–83, Internationale 78–80
  - Reserven/Jugend (72–77): Ersatz-TW, 2025/26-Neuzugänge ohne Bundesliga-Daten
  - Bewertungen um ~2 Punkte höher als vergleichbare Männer-Stufe, um den geringeren Ären-Vielfalt-Bonus zu kompensieren (max. 0,94 vs. 1,04 bei Männern)
- **Modusabhängige deutsche Spielanleitung** — das Info-Popup rendert nun dynamische deutsche Inhalte basierend auf dem aktiven Modus
  - Männer: 34 Spiele, 18 Teams, Männer-Punktetabelle, Männer-Spielerdatenbank-Übersicht
  - Frauen: 26 Spiele, 14 Teams, Frauen-BL-Punktetabelle, Frauen-Spielerdatenbank-Übersicht
  - Lädt README.md nicht mehr; wird bei jedem Öffnen neu gerendert

### Behoben
- **Frauen-Kartenauswahl-Bug** — Klicken einer Spielerkarte im Frauen-Modus hatte keine Wirkung, da der Handler `PLAYERS.find()` (Männer-Array) statt `activePlayers.find()` verwendete
- **Saisonbereichsangabe um ein Jahr verschoben** — die Deck-Überschrift zeigte z. B. "2020/21 – 2026/27" (eine Saison zu weit), da `activeTo` das Endjahr der letzten Saison ist. Behoben mit `seasonLabel(maxYear - 1)`
- **Nationalitätslabel Rebić** — `"🇭🇷 Croatia"` (englisch) korrigiert zu `"🇭🇷 Kroatien"` (deutsch)

---

## [0.32.1] — 2026-06-10

### Geändert
- **Frauen-BL-Gegnerliste korrigiert** — RB Leipzig durch Hamburger SV ersetzt
  - Leipzig war in der Frauen-Bundesliga im betrachteten Zeitraum nicht dauerhaft präsent
  - HSV Frauen ist die angemessenere Begegnung für die Ära; Schwierigkeit −0,02

---

## [0.32.0] — 2026-06-10

### Hinzugefügt
- **Frauen-Bundesliga-Saison-Engine** — Simulation läuft im Frauen-Modus als reguläre 26-Spiele-Saison
  - 13 Gegner (FC Bayern München, VfL Wolfsburg, Bayer 04 Leverkusen, SC Freiburg, TSG Hoffenheim, Hamburger SV, SGS Essen, SV Werder Bremen, Turbine Potsdam, MSV Duisburg, 1. FC Köln, SC Sand, Carl Zeiss Jena)
  - Separate `OPPONENT_DIFFICULTY_FRAUEN`-Tabelle kalibriert an der aktuellen Frauen-BL-Form: Bayern +0,22, Wolfsburg +0,18, Leverkusen +0,10; Jena −0,05, Sand −0,04
  - `estimatePositionFrauen()` kalibriert an der tatsächlichen Tabelle 2023/24: 1. ≥60 Pkt., UWCL direkt ≥48, UWCL-Qualifikation ≥38, Abstiegszone <20
  - `isChampion`-Schwellenwert 60 Pkt. (war 78), `isPerfect` 22 Siege (war 28), `isEuropa` 39 Pkt. (war 50), `isRelegated` <20 Pkt. (war <27)
  - `simulateSeason()` akzeptiert einen `mode`-Parameter (`'men'` | `'frauen'`)

---

## [0.31.3] — 2026-06-10

### Behoben
- **Frauen-Kader korrigiert anhand soccerdonna-Kaderseiten** (5 fehlende Spielerinnen, 6 Positions-/Zeitfehler)
  - Hinzugefügt: Bryane Heaberlin (TW/USA, 2020/21), Jessica Reiß (TW, 2022/23), Loreen Bender (RA, 2022/23), Tomke Schneider (IV, 2024/25), Marlene Wild (MF, 2024/25)
  - Sophie Nachtigall: `IV` → `OM` (soccerdonna listet sie durchgehend als OM)
  - Carlotta Wamser: `RA` → `RV` (soccerdonna bestätigt RV in allen Frankfurter Saisons)
  - Johanna Berg: `MF` → `ST` (als Angriff in 2024/25 aufgeführt)
  - Jella Veit: `activeFrom` 2021 → 2022
  - Remina Chiba: `activeFrom` 2024 → 2023 (trat im Januar 2024 bei = Saison 2023/24)
  - Nadine Riesen: `RV` → `LV` (in jeder aufgezeichneten Frankfurter Saison als LV eingesetzt)
  - Gesamt: 69 verifizierte Spielerinnen

---

## [0.31.2] — 2026-06-10

### Hinzugefügt
- **Kader 2025/26 zur Frauen-Datenbank hinzugefügt** — 16 neue Spielerinnen aus dem aktuellen Frauen-Bundesliga-Kader (via soccerdonna.de)
  - TW: Sophia Winkler, Janne Krumme, Ylvi Eisenbeiß
  - IV: Amanda Ilestedt (Schweden), Marthine Østenstad (Norwegen), Emily Wallrabenstein, Mina Matijević
  - MF/DM/OM: Eleni Markou (Griechenland), Noemi Ivelj, Jarne Teulings (Belgien), Ainhoa Alguacil (Spanien), Georgia Stanti, Tessa Zimmermann
  - STU: Hayley Raso (Australien), Rebecka Blomqvist (Schweden), Erëleta Memeti (Kosovo)
  - Abdeckung erweitert auf 2020/21–2025/26

---

## [0.31.1] — 2026-06-10

### Behoben
- **Frauen-Kader durch vollständig verifizierte Daten ersetzt** — anfängliche Platzhaltereinträge entfernt; alle 42 Spielerinnen gegen Wikipedia, Transfermarkt, offizielle Vereinsquellen und sport.de-Kaderseiten geprüft
  - TW-Zeiträume korrigiert: Merle Frohms 2020–2022, Stina Johannes 2022–2025
  - ~15 nicht verifizierte Spielerinnen entfernt (Cecilia Ran, Anna Klink, Lisi Mayr, Blázquez, Feldkamp, Haug, Islacker, Fölmli, Büchler u. a.)
  - 20+ verifizierte fehlende Spielerinnen hinzugefügt (Hechler, Hanshaw, Santos, Kirchberger, Feiersinger, Panfil, Mauron/Gaillard, Martinez, Wamser, Riesen, Chiba und weitere)
  - Jahrzehnt für alle Spielerinnen, die vor 2020 beigetreten sind, auf `2010s` korrigiert

---

## [0.31.0] — 2026-06-10

### Hinzugefügt
- **Frauen-Spielmodus** — neuer "Frauen"-Modus verwendet den Eintracht Frankfurt Frauen-Kader (2020/21–2024/25)
  - Modusumschalter ("Männer" / "Frauen") unter dem Formationsraster auf dem Startbildschirm
  - 32 Spielerinnen aus zwei Ären (2010er, 2020er): Laura Freigang, Nicole Anyomi, Sjoeke Nüsken, Barbara Dunst, Geraldine Reuteler, Sophia Kleinherne
  - Bewertungen sind Platzhalter (0) — in späterem Update kalibriert
  - Moduswechsel setzt den aktuellen Draft zurück
  - Alle bestehenden Draft-, Simulations- und Feuerwerks-Mechanismen funktionieren im Frauen-Modus identisch

---

## [0.30.0] — 2026-06-10

### Hinzugefügt
- **Feuerwerksanimation beim Meistertitel** — canvas-basierte Feuerwerksdarstellung startet automatisch beim Titelgewinn (1. Platz oder perfekte Saison)
  - 14 Raketen steigen vom unteren Bildschirmrand auf zufällige Höhen, hinterlassen Funken und explodieren in ~75 Partikel
  - Eintracht-Frankfurt-Farbpalette: Rot, Gold, Weiß, Orange
  - Gerendert auf einem festen Canvas (`z-index: 1050`) mit `pointer-events: none`
  - Stoppt automatisch wenn alle Partikel ausblenden, oder sofort beim Modal-Schließen

---

## [0.29.0] — 2026-06-10

### Geändert
- **Strenge Heim-/Auswärts-Abwechslung im Spielplan** — der Spielplan garantiert nun, dass Heim- und Auswärtsspiele während der gesamten Saison abwechseln
  - Zuvor konnte ein zufälliger Münzwurf pro Team lange Serien aufeinanderfolgender Heim- oder Auswärtsspiele erzeugen
  - Jetzt bestimmt ein einzelner geseedeter Münzwurf den Saisoneröffnungs-Schauplatz; alle weiteren Spiele wechseln strikt ab (H/A/H/A/…). Die gespiegelte Rückrunde setzt die Abwechslung nahtlos fort
  - Spielplan bleibt vollständig deterministisch

---

## [0.28.0] — 2026-06-10

### Geändert
- **Torverteilung nach Kader-Stärke gewichtet** — Toranzahlen bei Siegen und Niederlagen spiegeln nun `attackScore` und `defenseScore` wider
  - Bei Siegen: starke Angriffe (attackScore ≥ ~10) erhöhen P(3 Tore) auf 48%; schwache Angriffe senken es auf 18%
  - Bei Niederlagen: starke Abwehr (defenseScore ≥ ~14,5) erhöht P(1 Gegentor) auf 65%; schwache Abwehr senkt es auf 35%
  - Sieg/Unentschieden/Niederlage-Ergebnisse und erwartete Gesamtpunkte vollständig unverändert
- **Spielplan pro Kader gemischt** — Fisher-Yates-Shuffle (geseedet mit `seed + 777777`); jeder Kader hat eine einzigartige Spielplanreihenfolge, jeder Gegner erscheint weiterhin genau zweimal
- **Unentschieden-Wahrscheinlichkeit variiert pro Spiel** — `drawProb = 0,22 + (0,5 − gameWin) × 0,05`; ausgeglichene Begegnungen enden etwas häufiger unentschieden (~24%), einseitige etwas seltener (~21%)

---

## [0.27.0] — 2026-06-09

### Geändert
- **Balancestrafe durch glatte Kurve ersetzt** — Stufenfunktion (fest 7%/15%/25%) ersetzt durch kontinuierliche Formel: keine Strafe bis Ungleichgewicht 1,8, dann `Strafe = (Ungleichgewicht − 1,8) × 11,5%`, max. 25%
  - Fünf Saisons Debug-Daten zeigten, dass jeder Kader ein strukturelles defenseScore > midfieldScore-Ungleichgewicht (1,5–1,75) durch die inhärenten TW + 2 IV-Gewichte erzeugt
  - Der alte Schwellenwert bestrafte gut aufgebaute Kader für die Positionsgewichtsstruktur, nicht für echte Ungleichgewichtsentscheidungen

---

## [0.26.0] — 2026-06-09

### Hinzugefügt
- **DEBUG-Schaltfläche auf dem Ergebnisbildschirm** — erscheint nach Abschluss der Animation im Modal-Footer neben KADER ANZEIGEN
  - Öffnet ein Overlay mit monospace-formatiertem Saisondump (Kader, Engine-Zwischenwerte, Saisonzusammenfassung, Tor-Gesamt, alle Spielergebnisse mit Torschützen/Minuten)
  - KOPIEREN-Schaltfläche kopiert Text in die Zwischenablage

---

## [0.25.0] — 2026-06-09

### Behoben
- **Balancestrafe-Schwellenwert angehoben** — von `1,5` auf `1,6`; Kader nahe der alten Grenze erhielten 7% Strafe trotz vernünftiger Balance, was Top-Kader 10–12 Punkte unter Erwartung hielt

---

## [0.24.0] — 2026-06-09

### Geändert
- **Schwierigkeit reduziert — starke Kader können nun den Titel gewinnen**
  - Konstante von `−0,63` auf `−0,58` angepasst; Obergrenze von `0,70` auf `0,74` angehoben
  - Ein Kader mit 88–91 bewerteten Stürmern, TW-90, 82–85 Verteidigern und 79–80 Mittelfeldspielern erzeugt `winProb ≈ 0,70` (~79 erwartete Punkte, Titelbereich)
  - Schwache Kader unberührt — Mindestwert `0,18` bleibt unverändert
- **Spielerbewertungskorrekturen — Mittelfeld-Pool**
  - Michael Fink (MF, 2010er): **73 → 76** — 84 Bundesliga-Einsätze über sechs Saisons
  - Pirmin Schwegler (DM, 2000er): **79 → 81** — Schweizer Nationalspieler mit 108 Einsätzen

---

## [0.23.0] — 2026-06-09

### Behoben
- **"Tore"-Pluralisierung in Kaderübersicht** — ein Spieler mit genau 1 Saisontor zeigt nun korrekt "1 Tor" statt "1 Tore"

---

## [0.22.0] — 2026-06-09

### Behoben
- **Defektes Flaggenbild für jugoslawische Spieler** — ISO-Code `yu` ist eingestellt; Fahrudin Jusufi und Slobodan Komljenović zeigen nun `"Yugoslavia"` als reinen Text statt eines defekten Symbols

---

## [0.21.0] — 2026-06-09

### Behoben
- **Nationalitätsflaggen nicht auf Windows-Desktop angezeigt (Brave/Chrome)** — Windows-Systemschriftarten enthalten keine Flaggen-Emojis; alle Nationalitätsstrings werden nun über `flagImg()` gerendert (Regionalindikator-Emoji-Paar → 16×12 px PNG von flagcdn.com)
- **Feldplätze auf Mobilgeräten zu groß** — `@media (max-width: 600px)` setzt Slot-Größe auf 64×64 px zurück

---

## [0.20.0] — 2026-06-09

### Geändert
- **ANLEITUNG-Schaltfläche sichtbarkeit** — weiß mit weißem Rand im Ruhezustand (war kaum sichtbares `--dim`-Grau); Hover-Farbe zu leuchtendem Gelb (`#FFD700`) geändert
- **Feldplatz-Spieler-Slots verdoppelt** — Slot-Durchmesser von 64 px auf 128 px vergrößert; innerer Text proportional skaliert
- **Formationspositionen für 128 px-Slots auseinandergezogen** — alle sechs Formationen neu positioniert; Außenverteidiger auf x = 12 %/88 %, innere IVs auf 37 %/63 %; 5-Spieler-Reihen auf 10/30/50/70/90

---

## [0.19.0] — 2026-06-09

### Behoben
- **1:1 Unentschieden in Grün (Siegfarbe) angezeigt** — Torgenerierung konnte gleiche Spielstände mit `result = "W"` erzeugen
  - Fix: Siege verwenden `ga = Math.floor(rng() * gf)` (Gegner-Tore immer < Frankfurts); Niederlagen verwenden `ga` zuerst, dann `gf = Math.floor(rng() * ga)`

---

## [0.18.0] — 2026-06-09

### Hinzugefügt
- **ANLEITUNG-Schaltfläche in der Kopfzeile** — öffnet gestyltes Overlay mit vollständiger README; nach erster Ladung gecacht
- **Spielanleitung — Slot-Klick-Tipp erweitert** — erklärt nun das Hervorheben kompatibler Spieler beim Klicken eines leeren Slots

---

## [0.17.0] — 2026-06-09

### Geändert
- **Gegnerliste auf ewige Bundesliga-Tabelle aktualisiert** (Quelle: transfermarkt.de)
  - TSG Hoffenheim → **VfL Bochum** (#13, 1.296 Spiele)
  - RB Leipzig → **Kaiserslautern** (#11, 1.492 Spiele)
  - Wolfsburg → **1. FC Nürnberg** (#15, 1.118 Spiele)

---

## [0.16.0] — 2026-06-09

### Hinzugefügt
- **Torschützen im Spielticker** — Torschütze und Minute erscheinen unter jeder Ergebniszeile (z. B. `Meier 23', Hölzenbein 67'`)
  - Positionsgewichtete Zufallsauswahl: ST 3,0, LA/RA 2,0, OM 1,5, MF 0,8, DM 0,3, IV 0,12, TW 0,02
  - Separater geseedeter Zufallsgenerator — bestehende Spielergebnisse vollständig unverändert
- **Tore pro Spieler in KADER ANZEIGEN** — Saison-Torkonto in Gold unterhalb der Wertung (nur wenn Tore > 0)

### Geändert
- **Kader-Popup nach TW → ST sortiert** — KADER ANZEIGEN listet Spieler torwart-zuerst (TW → IV → RV/LV → DM → MF → OM → LA/RA → ST)

---

## [0.15.0] — 2026-06-08

### Hinzugefügt
- **Alle Jahrzehnte auf 13 Spieler aufgestockt** — garantiert 13 einzigartige Karten pro Deal
  - **1990er (+2):** Thomas Sobotzik (MF, 66 BL-Einsätze, 12 Tore) und Horst Heldt (MF, 64 BL-Einsätze, 9 Tore, 2 Länderspiele)
  - **2020er (+1):** Ansgar Knauff (RA, 96 BL-Einsätze, 13 Tore) — UEFA-Europa-League-Nachwuchsspieler der Saison 2021/22

### Behoben
- **Rafael Borré Jahrzehnt korrigiert** — von `"2010s"` zu `"2020s"`; SGE-Karriere lief 2021/22–2022/23

---

## [0.14.0] — 2026-06-08

### Behoben
- **Ergebnisbildschirm Positionsabweichung** — 2. Platz (68–77 Pkt.) zeigte fälschlicherweise "BUNDESLIGA-MEISTER · PLATZ 1"
  - `isChampion` korrigiert auf `points >= 78`; dedizierter VIZEMEISTER-Zweig für Platz 2 hinzugefügt

---

## [0.13.0] — 2026-06-08

### Geändert
- **Draft-Kopfzeile zeigt Ära statt spezifischer Saison** — "90er Jahre" statt "Saison 1993/94"; Unterbezeichnung von "Saisonkader" zu "Kader dieser Ära"

---

## [0.12.0] — 2026-06-08

### Geändert
- **Draft-Liste nach Position sortiert** — ST → RA/LA → OM → MF → DM → RV/LV → IV → TW

### Behoben
- **Randal Kolo Muani durch Omar Marmoush ersetzt** — Marmoush (58 Einsätze, 32 Tore, Wertung 89, 2022–2024) war bereits in der Datenbank

---

## [0.11.0] — 2026-06-08

### Hinzugefügt
- **Animierter Spielticker** — Ergebnisse erscheinen eine pro Sekunde; Ticker auf 420 px vergrößert, ÜBERSPRINGEN gibt alle verbleibenden Spiele sofort aus
- **Kader-Popup** — Kader in separates gold-umrahmtes Popup über KADER ANZEIGEN ausgelagert; SCHLIESSEN/NEUES SPIEL werden nach Saisonabschluss eingeblendet

---

## [0.10.0] — 2026-06-08

### Hinzugefügt
- **Pro-Gegner-Schwierigkeits-Modifikatoren** — jeder Gegner hat eine Stärkebewertung, die `winProb` für das individuelle Spiel verschiebt
  - Bayern München: −0,22 (schwierigster Gegner); BVB/Leverkusen/Leipzig: −0,14 bis −0,15
  - Augsburg/Köln/HSV/Hertha/Schalke: bis zu +0,03 (leichtere Gegner)
  - `gameWin` begrenzt auf [0,04; 0,76]

---

## [0.9.0] — 2026-06-08

### Geändert
- **Dreistufiges Positionskompatibilitätssystem** ersetzt das alte binäre Modell
  - **Grün** = Hauptposition (Faktor 1,0); **Gelb** = dokumentierte Ausweichposition (Faktor 0,88, −12 %); **Rot** = unvereinbar (Faktor 0,65, −35 %)
  - `POS_COMPAT`-Breitkompatibilitätsmatrix entfernt; Slot-Farbe aus individuellem `position`/`altPositions` abgeleitet
  - `positionFit`-Eigenschaft (`'main'` | `'alt'` | `'out'`) ersetzt altes boolesches `inPosition`-Flag

---

## [0.8.0] — 2026-06-08

### Behoben
- **Positionstabelle kalibriert an echten Bundesliga-Tabellen (2014/15–2023/24)**
  - 43 Punkte → ~9. Platz (war fälschlicherweise 6.); 73 Punkte → 2. Platz (Stuttgart 2023/24)
  - `isEuropa`-Schwellenwert (50 Pkt.) und `isRelegated` (<27 Pkt.) aktualisiert

---

## [0.7.0] — 2026-06-08

### Behoben
- **`POS_COMPAT` enger gefasst** — Matrix war viel zu permissiv; MF nicht mehr kompatibel mit RA/LA/RV/LV; RV/LV tauschen nur untereinander; ST streckt sich nur bis OM; RA/LA nur zu OM und dem gegenüberliegenden Flügel

---

## [0.6.0] — 2026-06-08

### Behoben
- **Engine verwendet nun Slot-Positions-Gewichte** — die grundlegende Behebung des Außer-Position-Exploits
  - Vorher: Engine verwendete `player.position` unabhängig von der Platzierung
  - Jetzt: Engine verwendet `slot.pos`; ein ST im TW-Slot wird mit TW-Gewichten bewertet
  - OOP-Strafe auf 25 % erhöht (war 18 %); Formel: `0,12 × totalPower − 0,63`

---

## [0.5.0] — 2026-06-08

### Behoben
- **Simulations-Engine nach zu einfachen Ergebnissen neu kalibriert** (54 Pkt. mit größtenteils OOP-Kader)
  - `goalBonus`-Multiplikator ×0,20 → ×0,04; `appBonus` ×0,10 → ×0,02
  - 18 % Wertungsstrafe für OOP-Platzierungen hinzugefügt
  - Ären-Vielfalt-Bonus-Bereich auf 0,90–1,04 angepasst

---

## [0.4.0] — 2026-06-08

### Behoben
- **Kritischer Engine-Bug: Spiel war unverliebar**
  - `winProb = 0,18 + 0,09 × totalPower` mit Kader-Power 7–10 → Werte 0,81–1,08; bei Cap 0,88 und `drawProb = 0,18` war `lossProb` negativ
  - Fix: `min(0,68, max(0,18, 0,07 × totalPower − 0,14))`; `drawProb` auf 0,22 angehoben

---

## [0.3.0] — 2026-06-08

### Hinzugefügt
- **Deutsche Positionsbezeichnungen** — TW, IV, RV, LV, DM, MF, OM, RA, LA, ST statt GK, CB, RB usw.
- **Alt-Positionen in Draft-Karten** — Nebenpositionen in kleinem Label neben der Hauptposition
- **Slot-Klick-Filter während des Drafts** — hebt kompatible Spieler (grüner Rahmen) hervor; `POS_DE`-Mapping und `posDE()`-Hilfsfunktion

---

## [0.2.0] — 2026-06-07

### Hinzugefügt
- **100-Spieler-Datenbank** — 24 neue historisch verifizierte Spieler hinzugefügt:
  - 1960er: Wolfgang Solz (ST), Karl-Heinz Wirth (IV)
  - 1970er: Peter Kunter (TW, *"der fliegende Zahnarzt"*), Gert Trinklein, Thomas Rohrbach, Peter Reichel, Wolfgang Kraus, Roland Weidle, Helmut Müller, Rüdiger Wenzel
  - 1980er: Frank Poth (RV), Werner Lorant (DM), Bernd Tretter (ST), Ralf Sievers (MF)
  - 1990er: Stefan Studer (MF), Dietmar Roth (IV, 264 BL-Einsätze), Slobodan Komljenović (IV)
  - 2000er: Alexander Schur (OM), Jermaine Jones (DM), Benjamin Köhler (OM)
  - 2010er: Sebastian Jung (RV), Bastian Oczipka (LV), Michael Fink (MF)
  - 2020er: Djibril Sow (DM)

### Behoben
- 4 Nicht-Frankfurter Spieler entfernt: Marc Ziegler, Rainer Zietsch, Bernd Krauss, Jan Šimák
- Historische Daten korrigiert: Uli Stein (activeFrom 1987), Axel Kruse (Jan 1991 von Hertha), Ralf Weber (Aug 1989 von Kickers Offenbach), Dieter Stinka (zu Darmstadt 98 nach 1965/66)

---

## [0.1.0] — 2026-06-06

### Hinzugefügt
- Erstveröffentlichung
- Formationsauswahl: 4-4-2, 4-3-3, 4-2-3-1, 3-5-2, 5-3-2, 4-1-4-1
- Draft-System: saisonbasierte Spieler-Pools, Jahrzehnt-Vielfalt-Bias, Deal/Platzierung Zwei-Phasen-Zustandsmaschine
- Spielfelddarstellung mit kompatiblen/inkompatiblen Slot-Farben
- `SGE_SEASONS`-Array mit allen 59 Bundesligasaisons (Lücken 1996–1997 und 2011–2012)
- Saison-Simulationsengine (`data/engine.js`) mit geseedetem Zufallsgenerator, Gegnerliste, Spielticker
- 76-Spieler-Erstdatenbank aus 6 Jahrzehnten SGE-Bundesliga-Geschichte
- Ären-Vielfalt-Bonus-System (0,85–1,05 Multiplikator)
- Balancestrafe für stark einseitige Kader
