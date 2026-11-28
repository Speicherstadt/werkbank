# Sicht A: Design-Critique-Rubrik & Craft Floor

Grundlage für Sicht A in `design-pruefen` – abgeleitet aus `critique.md`, `critique-rubric.md` und `craft-floor.md` von [pbakaus/impeccable](https://github.com/pbakaus/impeccable). Sicht A bewertet ohne Kenntnis von Sicht B.

## 1. Oberflächen-Modus einordnen

Der Maßstab richtet sich nach dem Zweck der konkreten Oberfläche (nicht des Gesamtprodukts):

- **Operate** (App-UI, Dashboards, Editoren, Formulare, Einstellungen, Werkzeuge): Scanbarkeit, Konsistenz, geringe Fehlerquote und die echte Arbeitssituation stehen über Dekoration. Qualität zeigt sich in Präzision und Zurückhaltung.
- **Read** (Doku, Anleitungen, Changelogs): Lesefluss, Gliederung und Typografie stehen im Vordergrund.
- **Persuade** (Landingpage, Marketing, Preise): Klarer Standpunkt, spürbarer Nutzen, starke visuelle Führung.
- **Experience** (Showcase, Portfolio): Das Werk führt den ersten Viewport, die Oberfläche tritt zurück.

## 2. Nielsen's 10 Usability-Heuristiken (je 0–4)

Ehrlich bewerten: **4** heißt wirklich exzellent, die meisten realen Oberflächen liegen zwischen **20 und 32 von 40**. Passt eine Heuristik nachweislich nicht zum Modus (z. B. 7 oder 10 auf einer reinen Landingpage), `n/a` mit Ein-Satz-Grund eintragen und das Maximum anpassen (z. B. `/32` statt `/40`).

| # | Heuristik | Prüfpunkte | Skala 0–4 |
| --- | --- | --- | --- |
| 1 | **Sichtbarkeit des Systemstatus** | Ladezustände, Bestätigung nach Aktionen, Fortschritt bei Mehr-Schritt-Abläufen, aktiver Navigationsort (auch Unterrouten), Inline-Validierung | 0 kein Feedback · 1 selten · 2 teils, große Lücken · 3 gut, kleine Lücken · 4 jede Aktion klar bestätigt |
| 2 | **Übereinstimmung mit der realen Welt** | Alltagssprache statt Technik-Jargon, natürliche Reihenfolge, eindeutige Icons/Metaphern, passende Domänensprache | 0 reiner Jargon · 1 meist verwirrend · 2 gemischt · 3 meist natürlich · 4 durchgängig klar |
| 3 | **Nutzerkontrolle und Freiheit** | Rückgängig/Abbrechen in Dialogen & Formularen, klares Zurück/Esc, Filter/Auswahl einfach zurücksetzen, kein Feststecken | 0 gefangen · 1 schwerer Ausweg · 2 Hauptwege ja, Randfälle nein · 3 gute Kontrolle · 4 überall klarer Ausweg |
| 4 | **Konsistenz und Standards** | Einheitliche Begriffe, gleiches Verhalten für gleiche Aktionen, Plattform-Konventionen, einheitliche Farben/Typo/Abstände | 0 zusammengewürfelt · 1 viele Brüche · 2 Kern passt, Details driften · 3 weitgehend stimmig · 4 vollständig kohärent |
| 5 | **Fehlervermeidung** | Bestätigung vor destruktiven Aktionen, Eingabe-Hilfen (Picker/Auswahlen), sinnvolle Standards, klare Labels, kein Doppel-Submit | 0 keine Schutzplanken · 1 kaum Schutz · 2 häufiges abgefangen · 3 gut geschützt · 4 Fehler kaum möglich |
| 6 | **Wiedererkennen statt Erinnern** | Sichtbare Optionen statt versteckter Menüs, Kontext-Hinweise, zuletzt Genutztes, beschriftete Icons | 0 Auswendiglernen nötig · 1 meist versteckt · 2 Kern sichtbar, Rest vergraben · 3 gut auffindbar · 4 alles direkt erkennbar |
| 7 | **Flexibilität und Effizienz** | Tastaturkürzel, schnelle Wiederholungswege, Sammelaktionen, Power-User-Wege ohne Einsteiger zu überladen | 0 ein starrer Weg · 1 kaum Abkürzungen · 2 Grund-Tastatur · 3 gute Beschleuniger · 4 sehr flexibel |
| 8 | **Ästhetik und Minimalismus** | Nur nötige Infos je Schritt, klare Hierarchie (eine Hauptaktion), gezielte Farbe, kein visueller Lärm | 0 überladen · 1 unruhig · 2 Kern ok, Rand laut · 3 überwiegend ruhig · 4 jedes Pixel verdient |
| 9 | **Fehler erkennen, verstehen, beheben** | Klartext statt Fehlercodes, benennt Ursache und nächsten Schritt, Fehler nah am Feld, Eingaben bleiben erhalten | 0 kryptisch/kein Text · 1 vage („Fehler“) · 2 nennt Problem, nicht Lösung · 3 klar mit Lösung · 4 perfekt und verlustfrei |
| 10 | **Hilfe und Dokumentation** | Leicht findbare, aufgabenbezogene, knappe Kontext-Hilfe (Hinweise, Tooltips, Links zur Doku) ohne Kontextverlust | 0 keine Hilfe · 1 schwer findbar · 2 Basis-Doku, nicht kontextuell · 3 gut durchsuchbar · 4 genau am rechten Ort |

**Bewertungsbänder:** **36–40** (≥ 90 %) Exzellent · **28–35** (≥ 70 %) Gut · **20–27** (≥ 50 %) Akzeptabel · **12–19** (≥ 30 %) Schwach · **0–11** (< 30 %) Kritisch.

## 3. Cognitive Load & Arbeitsgedächtnis

Drei Arten trennen: **Intrinsic** (Aufgabenkomplexität → strukturieren), **Extraneous** (schlechtes Design → kompromisslos streichen), **Germane** (Lernaufwand → durch konsistente Muster stützen).

### 8-Punkte-Checkliste (0–1 Fehler = niedrig, 2–3 = mittel, 4+ = hoch/kritisch)

- [ ] **Ein Fokus:** Hauptaufgabe ohne konkurrierende Elemente erledigbar?
- [ ] **Chunking:** Infos in verdaulichen Gruppen (≤ 4 Elemente je Gruppe)?
- [ ] **Gruppierung:** Zusammengehöriges klar über Nähe, Rahmen oder Fläche verbunden?
- [ ] **Visuelle Hierarchie:** Sofort erkennbar, was am wichtigsten ist?
- [ ] **Eins nach dem anderen:** Eine Entscheidung nach der nächsten?
- [ ] **Wenig Auswahl:** Höchstens **4 sichtbare Optionen** je Entscheidungspunkt (Arbeitsgedächtnis-Regel nach Miller/Cowan: ≤ 4 gut, 5–7 grenzwertig, 8+ überladen)?
- [ ] **Kein Merken über Screens:** Keine Info vom vorigen Bildschirm im Kopf nötig?
- [ ] **Progressive Disclosure:** Komplexität erscheint erst, wenn sie gebraucht wird?

### 8 typische Cognitive-Load-Verstöße gezielt benennen

1. **Wall of Options:** 10+ gleichgewichtete Optionen gleichzeitig → gruppieren / Menü.
2. **Memory Bridge:** Info aus Schritt 1 fehlt in Schritt 3 → sichtbar mitführen.
3. **Hidden Navigation:** Aktueller Ort unklar → aktiver Zustand / Breadcrumb.
4. **Jargon Barrier:** Fach- oder Technikbegriffe ohne Erklärung → Alltagssprache.
5. **Visual Noise Floor:** Alles gleich laut → 1 Hauptelement, 2–3 sekundäre, Rest ruhig.
6. **Inconsistent Pattern:** Gleiche Aktion sieht/funktioniert anderswo anders → vereinheitlichen.
7. **Multi-Task Demand:** Lesen, Entscheiden und Navigieren gleichzeitig erzwungen → sequenzieren.
8. **Context Switch:** Hin- und Herspringen zwischen Tabs/Modals für eine Entscheidung → zusammenlegen.

## 4. Persona-Walkthroughs

2–3 passende Personas wählen (plus 1–2 projektbezogene aus `DESIGN.md`/`PRODUCT.md`, falls vorhanden) und den **Hauptablauf** konkret durchspielen. Nur echte Brüche mit Elementnamen melden, keine Floskeln.

| Persona | Typ | Typische Red Flags |
| --- | --- | --- |
| **Alex** | Ungeduldiger Power-User | Erzwungenes Onboarding, fehlende Tastaturwege/Esc, zu viele Klicks, unnötige Bestätigungen bei harmlosen Aktionen, fehlende Sammelaktionen |
| **Jordan** | Unsicherer Erstnutzer | Reine Icon-Navigation ohne Text, Jargon, unklarer erster Schritt (> 5 s), fehlende Erfolgsbestätigung, kein sichtbares Zurück/Hilfe |
| **Sam** | Tastatur & Screenreader / Sehhilfe | Nur per Maus/Hover erreichbare Aktionen, fehlender Fokus-Ring, Farbe als einziges Merkmal, unbeschriftete Felder/Knöpfe, Zoom-Brüche bis 200 % |
| **Riley** | Stresstester (Randfälle) | 0 oder 1.000 Einträge, sehr lange Namen/Übersetzungen, Seiten-Reload im Ablauf, stille Fehler ohne Rückmeldung, Inkonsistenz zwischen Ansichten |
| **Casey** | Abgelenkt am Handy (Einhändig) | Hauptaktion außer Daumenreichweite, Touch-Ziele < 44 px, zu viele Zeilen Werkzeugleiste, Tippen statt Auswahl, Zustandsverlust beim App-Wechsel |

**Auswahlhilfe:** App/Dashboard/Admin → Alex, Sam (+ Casey mobil) · Formular/Wizard → Jordan, Sam, Casey · Landingpage → Jordan, Riley, Casey · Daten/Tabellen → Alex, Sam.

## 5. Craft Floor (Verify & Refuse)

Abgeleitet aus `craft-floor.md` – prüft, ob die Oberfläche handwerklich gebaut oder nach generischem KI-/Baukasten-Muster zusammengeklebt wirkt (`DESIGN.md` des Projekts geht bei gewollten Vorgaben immer vor):

- **Verify:**
  - Kontrast (Fließtext/Placeholder ≥ 4,5:1, Großtext ≥ 3:1; auf farbigen Flächen Nebentext aus Farbton/Vordergrund, kein totes Grau).
  - Abstände (enge Gruppen, klare Trennung, mehr Abstand *über* als *unter* Überschriften).
  - Typografie (Zeilenlänge ~65–75 Zeichen bei Fließtext, ausgewogene Überschriften, echte Skalen- & Gewichtsstufen, reale Texte auf allen Breakpoints).
  - Zustände (hover, disabled, loading, error, empty) und Browser-Flächen (Fokus-Ring, Scrollbar, `tabular-nums`, Auswahlfarbe, `<select>`).
  - Sprache (Produkt-Sprache, Aktionsnamen auf Knöpfen, Fehler nennen Ursache + Lösung).
- **Refuse (generische Defaults hinterfragen, wenn `DESIGN.md` sie nicht begründet):**
  - **Harte Ausschlüsse:** Kicker/Eyebrows über Überschriften und **verschachtelte Karten**.
  - Gleichförmige Icon+Überschrift+Text-Karten als Seitenstruktur; sinnlose Abschnittsnummern (`01 / 02 / 03`).
  - Generisches Hero-Metric-Template (große Zahl + kleines Label + Deko-Akzent ohne Sinn).
  - Modale für Aufgaben, die weder Unterbrechung noch geschützten Fokus brauchen.
  - Verlaufs-Text, Deko-Glassmorphism/Blur, **einseitige farbige Balken** an abgerundeten Boxen, harte Block-Schatten außerhalb passender Stile, Monospace als bloßes „Tech-Kostüm“, Unicode-Emojis statt einheitlichem Icon-System.

## 6. Schweregrade (P0–P3)

- **P0 – Blockierend:** Hauptaufgabe nicht abschließbar, Datenverlust oder Totalausfall → sofort beheben.
- **P1 – Wesentlich:** Erhebliche Verwirrung, Verstoß gegen `DESIGN.md` oder WCAG AA → vor Release/Merge beheben.
- **P2 – Störend:** Spürbare Reibung mit Umweg → nächster Durchgang.
- **P3 – Feinschliff:** Kleine Verbesserung ohne harte Nutzerblockade → sparsam halten, damit es P0/P1 nicht begräbt.

*Faustregel:* Würde eine Nutzerin deshalb den Support anschreiben? Wenn ja, mindestens **P1**.
