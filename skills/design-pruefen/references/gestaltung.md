# Sicht A: Gestaltung und Nutzung

Prüfung aus Sicht eines Menschen, der die Anwendung im Alltag benutzt – auf echten Screenshots (Desktop, Handy, Hell, Dunkel, Sondergrößen) und gegen `DESIGN.md` sowie das Mockup des Projekts. Zuerst schauen, dann urteilen; Code nur öffnen, um eine Stelle zu belegen.

## Prüffelder

Jedes Feld kurz prüfen und mit **gut / gemischt / schwach** einordnen. Jeder Befund braucht das konkrete Bild (Bildschirm, Größe, Theme) und was darauf passiert.

1. **Erste Wahrnehmung & Hierarchie**
   - Ist in zwei Sekunden klar, was die Hauptaktion der Ansicht ist?
   - Gibt es höchstens **eine** dunkel gefüllte Hauptaktion (`primary`) je Ansicht, oder konkurrieren zwei Karten/Knöpfe um denselben Blick?
   - Wirkt die Fläche ruhig und dicht statt unruhig (überflüssige Rahmen, Deko-Icons, ständige Hover-Griffe)?
2. **Orientierung & Navigation**
   - Zeigt Seitenleiste bzw. Tab-Leiste klar, wo man ist – auch auf Unterrouten (etwa Detailseiten, Abschluss, Export)?
   - Ist erkennbar, mit welchem Konto, Mandanten oder Betrieb man gerade arbeitet, und wie man abmeldet oder wechselt?
   - Passen Icons exakt zu dem, was angeboten wird (kein QR-Symbol, wenn nur PIN aktiv ist; kein Warnsymbol für neutrale Info)?
3. **Semantik & Farbe**
   - Bleiben Statusfarben (`success`, `warning`, `danger`) echten Zuständen, Hinweisen und Verstößen vorbehalten, oder nutzen Kategorien/Rollen/neutrale Salden dieselben Farben?
   - Steht Farbe nie allein (immer Text oder eindeutiges Icon daneben)?
   - Tragen Warnflächen oder dunkle Hintergründe ausreichend kontraststarken Text?
4. **Typografie, Zahlen & Einheiten**
   - Stehen Zahlen, Beträge, Uhrzeiten und Dauern sauber ausgerichtet (`tabular-nums`) und im Format aus `DESIGN.md` (z. B. `7:30` statt Dezimalstunden, auch auf Diagramm-Achsen)?
   - Werden Felder, Auswahlen oder Überschriften am Desktop (auch bei 1024 px) oder bei längeren Übersetzungen ungünstig abgeschnitten?
5. **Handy, Tablet & Sondergrößen**
   - Passt die Ansicht ohne kaputten Umbruch und ohne auf wenige Pixel gequetschte Spalten?
   - Überlädt eine Werkzeugleiste den schmalen Bildschirm über mehrere Reihen statt seltene Aktionen sauber zu bündeln?
   - Stehen wichtige Kennzahlen und Inhalte ohne unnötiges Stapeln im sichtbaren Bereich?
6. **Zustände & Rückmeldung**
   - Sind Leer-, Lade-, Fehler- und Bestätigungszustände verständlich und hilfreich?
   - Schützt die Oberfläche vor versehentlichem Löschen oder Doppelklicks?
   - Verschwinden Knöpfe, die gerade nichts tun können (z. B. „Veröffentlichen“ ohne Entwurf), oder täuschen sie eine offene Aufgabe vor?
7. **Treue zu `DESIGN.md` und Mockup**
   - Wo weicht die Oberfläche ohne dokumentierten Grund von `DESIGN.md` oder Mockup ab?
   - Wo widersprechen sich zwei Bildschirme derselben App bei gleichem Muster (Abstände, Knöpfe, Dialoge, Karten)?

## Ausgabe von Sicht A

- **Kurzfazit:** 2–3 Sätze, was schon stark ist und wo der größte Hebel liegt.
- **Einordnung:** Tabelle der 7 Prüffelder (gut / gemischt / schwach + je ein Satz).
- **Befunde:** geordnet nach Wirkung (hoch / mittel / niedrig), jeweils mit **Bildschirm/Größe/Theme**, **Beobachtung**, **Regel/Warum** und **konkretem Vorschlag**.
