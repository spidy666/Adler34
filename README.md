# 34-0 — Eintracht Frankfurt Bundesliga Dream Team

Stelle das größte Eintracht Frankfurt XI aller Zeiten zusammen und simuliere eine vollständige Bundesligasaison. Kannst du mit einem Kader aus der gesamten Bundesliga-Geschichte des Vereins den Titel gewinnen?

**Live:** [spidy666.github.io/Adler34](https://spidy666.github.io/Adler34) *(oder lokal ausführen — siehe unten)*

> Inspiriert von [82-0.com](https://www.82-0.com/), [38-0.app](https://38-0.app/game) und ähnlichen Dream-Team-Spielen für andere Ligen.

---

## So wird gespielt

1. **Formation wählen** — sechs klassische Aufstellungen verfügbar (4-4-2, 4-3-3, 4-2-3-1, 3-5-2, 5-3-2, 4-1-4-1)
2. **Kader zusammenstellen** — jede Runde bietet eine Auswahl an Frankfurter Spielern. Wähle einen; die übrigen werden verworfen
3. **Spieler auf dem Spielfeld platzieren** — klicke eine Karte, dann einen freien Platz
   - **Grüner Platz** = natürliche (Haupt-)Position des Spielers — keine Strafe
   - **Gelber Platz** = eine der historisch dokumentierten Ausweichpositionen — geringe Strafe (~12 %)
   - **Roter Platz** = unvereinbare Position — empfindliche Strafe (~35 %)
   - **Tipp:** Klicke einen freien Feldplatz *vor* Auswahl einer Karte, um alle passenden Spieler hervorzuheben — grüner Rahmen für Hauptposition, goldener Rahmen für Ausweichposition, abgedunkelt für unvereinbar
4. **Alle 11 Positionen besetzen**, dann **SAISON SIMULIEREN** klicken
5. Alle Spielergebnisse erscheinen nacheinander (oder **ÜBERSPRINGEN** klicken zum Auslassen). Jedes Ergebnis zeigt den Torschützen und die Minute. Nach dem letzten Spiel werden Punkte, Tordifferenz und Abschlusstabellenplatz angezeigt
   - **KADER ANZEIGEN** klicken, um den Kader zu überprüfen — torwart-zuerst sortiert, mit der Saisontoranzahl jedes Spielers neben seiner Wertung. Positionspassung ist farbkodiert: grün (Hauptposition), gelb (Ausweichposition), rot (außerhalb der Position)

### Spieltipps
- **Ären-Vielfalt zählt** — ein Kader aus 4+ Jahrzehnten erhält einen Chemie-Bonus; Ein-Ären-Kader werden bestraft
- **Positionsplatzierung zählt** — die Engine bewertet jeden Spieler anhand der Gewichtung des besetzten Platzes, nicht seiner natürlichen Position. Ein Stürmer im Tor trägt als (schlechter) Torwart bei
- **Balance zählt** — ein Kader, der stark auf Angriff oder Abwehr ausgerichtet ist, wird im Vergleich zu einer ausgeglichenen Mannschaft bestraft

---

## So funktioniert die Simulation

Der Beitrag jedes Spielers wird in drei Dimensionen berechnet, basierend auf seiner **Platzposition** (wo er tatsächlich spielt, nicht seiner natürlichen Position):

| Dimension | Hauptbeiträger |
|-----------|----------------|
| Angriff | ST, RA, LA, OM — gewichtet nach Toren |
| Mittelfeld | MF, DM, OM — gewichtet nach Einsätzen |
| Abwehr | TW, IV, RV, LV, DM — gewichtet nach Position |

Die drei Werte fließen in eine **Power-Wertung** ein, die modifiziert wird durch:
- **Balancestrafe** — stark einseitige Kader erhalten bis zu 25 % Strafe
- **Ären-Vielfalt-Bonus** — Kader aus 1–6 verschiedenen Jahrzehnten erhalten einen Multiplikator von 0,90 bis 1,04
- **Dreistufige Positionsstrafe** — Hauptposition: 100 % Effektivität; historisch dokumentierte Ausweichposition: 88 %; völlig unvereinbar: 65 %

Die Power-Wertung bestimmt eine **Basis-Siegeswahrscheinlichkeit** (max. 70 %), die dann pro Spiel je nach Gegnerstärke angepasst wird — Bayern München zu schlagen ist deutlich schwerer als Bochum. Ergebnisse sind deterministisch pro Kader (geseedeter Zufallsgenerator), sodass dasselbe XI immer dieselbe Tabelle erzeugt. Siege haben immer mehr Frankfurter Tore als Gegentore; Unentschieden immer gleich viele; Niederlagen immer weniger. Gegner werden aus der ewigen Bundesligatabelle (transfermarkt.de) gezogen.

### Tabellenplatz-Schwellenwerte *(kalibriert an Bundesliga 2014/15–2023/24)*

| Punkte | Platz |
|--------|-------|
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

## Spielerdatenbank

**102 historische SGE-Spieler** aus allen sechs Bundesliga-Jahrzehnten, in denen der Verein angetreten ist, von der ersten Saison 1963/64 bis 2024/25. Nur Spieler mit bedeutenden Bundesligakarrieren bei Frankfurt sind enthalten. Jedes Jahrzehnt hat mindestens 13 Spieler, was pro Runde eine vollständige einzigartige Auswahl garantiert.

| Jahrzehnt | Spieler | Bekannte Spieler |
|-----------|---------|-----------------|
| **1960er** | 14 | Egon Loy, Alfred Pfaff, Erwin Stein, Jürgen Grabowski, Fahrudin Jusufi, Wolfgang Solz, Dieter Stinka |
| **1970er** | 18 | Bernd Hölzenbein, Karl-Heinz Körbel, Bernd Nickel, Jürgen Pahl, Peter Kunter, Gert Trinklein, Helmut Müller, Werner Lorant |
| **1980er** | 13 | Cha Bum-kun, Bruno Pezzey, Uwe Bein, Andreas Köpke, Frank Poth, Bernd Tretter, Ralf Sievers, Uli Stein, Manfred Binz |
| **1990er** | 13 | Tony Yeboah, Jay-Jay Okocha, Andreas Möller, Axel Kruse, Dietmar Roth, Slobodan Komljenović, Ralf Weber, Thomas Sobotzik, Horst Heldt |
| **2000er** | 13 | Alexander Meier, Marco Russ, Pirmin Schwegler, Jermaine Jones, Alexander Schur, Benjamin Köhler |
| **2010er** | 18 | Kevin Trapp, Filip Kostić, André Silva, Daichi Kamada, Sebastian Jung, Bastian Oczipka, Marc Stendera |
| **2020er** | 13 | Djibril Sow, Mario Götze, Omar Marmoush, Rafael Borré, Ansgar Knauff |

Jedes Spielerobjekt enthält:
- Wertung (70–92), Bundesligaeinsätze und -tore bei der SGE
- Aktive Saisons beim Verein (`activeFrom` / `activeTo` als Saisonstartjahr)
- Hauptposition (deutsche Bezeichnung) und historisch dokumentierte `altPositions`
- Karriere-Bio und Haupttrophäe

---

## Frauen-Modus

**68 verifizierte Spielerinnen** aus dem Eintracht Frankfurt Frauen-Kader (2020/21–2025/26). Der Frauen-Modus simuliert eine 26-Spiele-Saison mit 13 Frauen-Bundesliga-Gegnern. Wettbewerbsregeln entsprechen der FLYERALARM Frauen-Bundesliga:

- 1. Platz → Champions League (direkte Gruppenphase)
- 2.–3. Platz → CL-Qualifikation
- 13.–14. Platz → Abstieg

---

## Projektstruktur

```
Adler34/
├── index.html              ← Gesamte UI, Spiellogik, Formationen, Draft-Engine
├── data/
│   ├── players.js          ← Männer-Spielerdatenbank (102 Spieler, ES-Modul)
│   ├── players-women.js    ← Frauen-Spielerdatenbank (68 Spielerinnen, ES-Modul)
│   └── engine.js           ← Saison-Simulationsengine (Männer & Frauen)
├── CHANGELOG.md
└── README.md
```

Kein Build-Schritt, kein Framework, keine Abhängigkeiten. Reines Vanilla-JS mit ES-Modulen.

---

## Lokal ausführen

Das Spiel verwendet ES-Module (`import/export`) und **kann nicht** durch Doppelklick auf `index.html` geöffnet werden. Verwende einen lokalen HTTP-Server:

**VS Code Live Server** (einfachste Methode)
1. Erweiterung *Live Server* von Ritwick Dey installieren
2. Rechtsklick auf `index.html` → **Open with Live Server**

**Python**
```bash
python3 -m http.server 8080
# http://localhost:8080 aufrufen
```

**Node**
```bash
npx serve .
```

---

## Datenquellen

Spielerstatistiken gesammelt und abgeglichen aus:
- Offiziellen Bundesliga-Aufzeichnungen
- Wikipedia — *Liste der Eintracht-Frankfurt-Spieler*, einzelne Saisonartikel
- worldfootball.net Kaderarchiven
- transfermarkt.de Karrierehistorien
- history.eintracht.de (offizielle SGE-Vereinsgeschichte)
- soccerdonna.de (Frauen-Kader und -Statistiken)
- Fotmob, Footballcritic (Positionsverifikation)
