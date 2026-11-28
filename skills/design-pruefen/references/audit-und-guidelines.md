# Sicht B: Technisches Audit (/20) & Web Interface Guidelines

Grundlage für Sicht B in `design-pruefen` – verbindet das 5-Dimensionen-Audit aus `audit.md` ([pbakaus/impeccable](https://github.com/pbakaus/impeccable)) mit dem vollständigen Regelwerk der **Web Interface Guidelines** ([vercel-labs/web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines)). Jeder Befund nennt `datei:zeile`, Kategorie, Auswirkung und konkreten Fix.

---

## Teil 1: Technisches Audit (5 Dimensionen, je 0–4 → /20)

| # | Dimension | Prüfpunkte | Skala 0–4 |
| --- | --- | --- | --- |
| 1 | **Accessibility (A11y)** | Textkontrast (< 4,5:1 / Großtext < 3:1), Bedienelement-Rahmen WCAG 1.4.11 (< 3:1), sinnvolles `prefers-reduced-motion` (kein pauschaler `0.01ms`-Kill, der Status-Feedback zerstört), ARIA-Rollen/-Zustände, Tastaturnavigation & Fokus-Ringe, semantisches HTML, Alt-Texte, Formular-Labels & Fehlermeldungen | 0 WCAG A verfehlt · 1 große Lücken · 2 teilweise · 3 WCAG AA weitgehend erfüllt · 4 WCAG AA voll erfüllt |
| 2 | **Performance** | Layout-Thrashing (DOM-Reads/Writes gemischt), teure Animationen (`width`/`top`/`left`, unbegrenzter Blur/Schatten), `will-change`-Übernutzung im Ruhezustand, Bilder ohne Dimensionen/Lazy-Loading, unnötige Re-Renders, unvirtualisierte große Listen (> 50 Einträge) | 0 schwerwiegend · 1 große Bremsen · 2 teilweise optimiert · 3 gut · 4 schlank & schnell |
| 3 | **Theming** | Hartkodierte Farben statt Design-Tokens, kaputter Dark Mode (`<select>`/`<option>`, Canvas/SVG, Kontrast), inkonsistente Tokens, fehlende Reaktion bei Theme-Wechsel, `<meta name="theme-color">` (bei manueller Wahl vor Media-Query-Metas im `<head>`) | 0 kein Theming · 1 kaum Tokens · 2 gemischt · 3 gut · 4 vollständig sauber in Hell/Dunkel |
| 4 | **Responsive Design** | Feste Pixelbreiten, Touch-Ziele (< 44×44 px mobil; WCAG 2.5.8 mind. 24×24 px bzw. Abstand), echte Touch-Interaktion (Drag/Slider/Menüs mit `touch-action`, kein Hängenbleiben bei Cancel/LostPointerCapture, kein Auslösen beim Scrollen), horizontaler Überlauf, Textskalierung, **RTL-Prüfung** (s. u.) | 0 nur Desktop · 1 viele Brüche · 2 raue Kanten · 3 gut · 4 flüssig auf allen Größen (bei durchgängigen RTL-Fehlern −1) |
| 5 | **Implementation Integrity** | Wiederholte Abkürzungen, Drift weg von `DESIGN.md`/Komponentenbibliothek, dekorativer Ballast, Fehlalarm-Filterung bei Detektor-Funden (wenn `impeccable detect` oder Axe läuft, getrennte Ausweisung) | 0 systemischer Drift · 1 schwere Wiederholungen · 2 mehrere Funde · 3 isolierte Kleinigkeiten · 4 kohärent & bewusst |

**Bewertungsbänder (/20):** **18–20** Exzellent · **14–17** Gut · **10–13** Akzeptabel · **6–9** Schwach · **0–5** Kritisch.

### RTL-Sonderregeln (nur bei Seiten mit `dir="rtl"` auf `<html>`/`<body>`)

- Physische Richtungs-Properties (`margin-left/right`, `padding-left/right`, `text-align: left/right`, `border-left/right`, `left`/`right`) zugunsten logischer CSS-Properties (`margin-inline-start/end`, `padding-inline-start/end`, `text-align: start/end`, `border-inline-start/end`, `inset-inline-start/end`) prüfen – nur melden, wenn gerendert tatsächlich falsch.
- Ausnahme: `left: 50%; transform: translateX(-50%)` ist richtungsneutral; Umstellung auf `inset-inline-start` bricht die Zentrierung.
- Richtungs-Icons (Pfeile, Chevrons) und Kalender-Pfeiltasten auf korrekte Spiegelung prüfen; `lang` einer RTL-Sprache (`ar`, `he`, `fa`, `ur` …) ohne `dir="rtl"` melden.
- Uhrzeiten, Zahlen, Salden und Codes mit `dir="ltr"` schützen.

---

## Teil 2: Web Interface Guidelines (16 Kategorien + Anti-Patterns)

### 1. Accessibility
- Icon-only-Buttons brauchen `aria-label`; Formularfelder brauchen `<label>` oder `aria-label`.
- Interaktive Elemente brauchen Tastatur-Handler; `<button>` für Aktionen, `<a>`/`<Link>` für Navigation (nie `<div onClick>`).
- Bilder brauchen `alt` (oder `alt=""` dekorativ); dekorative Icons `aria-hidden="true"`.
- Asynchrone Meldungen (Toasts, Fehler, Status) brauchen `aria-live="polite"` / `role="alert"`.
- Semantisches HTML vor ARIA; saubere Überschriften-Hierarchie `<h1>`–`<h6>`; Skip-Link zum Hauptinhalt (`#main`); `scroll-margin-top` auf Sprung-Überschriften.
- WCAG 2.5.3 (Label in Name): kein `aria-label`, das sichtbaren Text eines Knopfes überschreibt; geschlossene Popover-Inhalte nicht unnötig in die Zugänglichkeits-Suche lecken lassen.

### 2. Focus States
- Sichtbarer Fokus (`focus-visible:outline-*` / `ring-*`); nie `outline-none` ohne Ersatz.
- `:focus-visible` statt `:focus` (kein Ring beim Mausklick); `:focus-within` bei zusammengesetzten Feldern.
- Sticky Header/Footer/Overlays dürfen das fokussierte Element nicht verdecken.
- Dialoge/Vollbild setzen Hintergrund `inert` (oder nutzen `showModal()`), verschieben Fokus hinein und bei Esc/Schließen zurück auf den Auslöser.

### 3. Forms
- Passende `autocomplete`, `name`, `type` (`email`, `tel`, `url`, `number`) und `inputmode`.
- Nie Einfügen blockieren (`onPaste` + `preventDefault`).
- Klickbare Labels (`for`/`htmlFor` oder umschließend); Checkbox/Radio teilen eine gemeinsame Klickfläche ohne tote Zonen.
- Rechtschreibprüfung auf E-Mails, Kennungen, Codes aus (`spellcheck="false"`, als String wo Frameworks boolesches `false` entfernen) und `autocapitalize="off"`.
- Absende-Knopf bleibt bis zum Klick aktiv, wird während laufender Anfrage deaktiviert/angezeigt (kein Doppel-Submit).
- Fehler inline am Feld; ersten Fehler beim Absenden fokussieren; Platzhalter mit `…` und Beispielmuster; `autocomplete="off"` auf Nicht-Auth-Feldern gegen Passwortmanager-Fehltrigger; Warnung bei ungespeicherten Änderungen.

### 4. Animation
- `prefers-reduced-motion` respektieren (reduzierte Variante oder Abschalten ohne Statusverlust).
- Nur GPU-freundliche Eigenschaften (`transform`, `opacity`); nie `transition: all`, sondern Eigenschaften explizit nennen.
- Korrektes `transform-origin`; bei SVG auf `<g>` mit `transform-box: fill-box; transform-origin: center`.
- Animationen unterbrechbar; laufende Bewegung > 5 s neben Inhalt pausier-/stoppbar; dekorative Endlosschleifen unter `prefers-reduced-motion` stoppen.

### 5. Typography
- Typografische Zeichen: `…` statt `...`, typografische Anführungszeichen (`„…“` / `“…”`), geschützte Leerzeichen (`10&nbsp;MB`, `⌘&nbsp;K`).
- Ladezustände enden mit `…` („Lädt…“, „Speichert…“).
- `font-variant-numeric: tabular-nums` für Zahlenspalten, Zeiten und Vergleiche.
- `text-wrap: balance` / `text-pretty` auf Überschriften.

### 6. Content Handling
- Lange Texte abfangen (`truncate`, `line-clamp-*`, `break-words`); Flex-Kinder brauchen `min-w-0` für `truncate`.
- Leerzustände sauber behandeln (keine kaputte UI bei `""`/`[]`); kurze, mittlere und extrem lange Nutzereingaben mitdenken.

### 7. Images
- Explizite `width` und `height` auf `<img>` gegen CLS; unterhalb des Folds `loading="lazy"`, kritische Hero-Bilder priorisieren.

### 8. Performance
- Große Listen (> 50 Einträge) virtualisieren oder `content-visibility: auto`.
- Keine Layout-Reads im Render (`getBoundingClientRect`, `offsetHeight`, `scrollTop`); DOM-Reads/Writes bündeln; Top-Layer Popover API + CSS Anchor Positioning statt manueller Scroll-Listener.
- Unkontrollierte oder günstige kontrollierte Eingaben; `<link rel="preconnect">` für externe Assets; kritische Schriften mit `font-display: swap`; `<video autoplay muted loop playsinline>` statt animiertem GIF.

### 9. Navigation & State
- Zustand (Filter, Reiter, Zeitraum, Seiten) nach Möglichkeit in der URL spiegeln; echte `<a>`/`<Link>` für Cmd/Ctrl-/Mittelklick.
- Destruktive Aktionen (Löschen, Entfernen) immer mit Bestätigungsdialog oder Rückgängig – nie sofort ohne Schutz.
- Horizontale `overflow-x-auto`-Tabellen per `tabindex="0"` und Fokus-Ring tastaturscrollbar.

### 10. Touch & Interaction
- `touch-action: manipulation` gegen 300-ms-Zoom-Verzögerung; bewusste `-webkit-tap-highlight-color`.
- `overscroll-behavior: contain` in Dialogen, Menüs, Popovers und Vollbild-Ebenen.
- Hover-Only-Elemente (`+`, Griffe, Zeilenaktionen) nur hinter `@media (hover: hover)` ausblenden.
- Auswahllisten wählen auf `click` (mit `onMouseDown` gegen Fokusverlust), nicht auf `pointerdown` (verhindert Auswahl bei Rechtsklick/Touch-Scroll).
- Drag/Swipe-Gesten brauchen Tipp- und Tastaturalternative; beim Ziehen Textauswahl abschalten; `autoFocus` sparsam und nicht mobil erzwingen.

### 11. Safe Areas & Layout
- Randlose Layouts beachten `env(safe-area-inset-*)`; unerwünschte Scrollbars beheben statt wegzuschneiden; Flex/Grid statt JS-Layout-Messung.

### 12. Dark Mode & Theming
- `color-scheme: dark` auf `<html>` im dunklen Theme; `<meta name="theme-color">` passend zur Fläche; explizite Farben auf nativem `<select>`/`<option>`.

### 13. Locale & i18n
- Daten, Uhrzeiten, Zahlen und Währungen über `Intl.DateTimeFormat` / `Intl.NumberFormat` / `Intl.DisplayNames` statt hartkodierter Formate; alle Sprachdateien vollständig.
- Markennamen, Codes und Bezeichner mit `translate="no"` schützen.

### 14. Hydration & Framework-Sicherheit
- Kontrollierte Felder konsistent verdrahten; Datums-/Zeitdarstellung ohne SSR/Client-Abweichung; Framework-Eigenheiten (z. B. boolesche vs. String-Attribute) beachten.

### 15. Hover & Interactive States
- Knöpfe und Links brauchen sichtbares `hover:`-Feedback; interaktive Zustände (`hover`/`active`/`focus`) erhöhen den Kontrast gegenüber dem Ruhezustand.

### 16. Content & Copy
- Aktive, direkte Ansprache; konkrete Aktionsnamen auf Knöpfen („Buchung speichern“ statt „Weiter“); Ziffern für Anzahlen; Fehlermeldungen nennen Ursache und nächsten Schritt.

### 14 Anti-Patterns (immer melden)

1. `user-scalable=no` oder `maximum-scale=1` (Zoom blockiert)
2. `onPaste` mit `preventDefault`
3. `transition: all`
4. `outline-none` ohne `focus-visible`-Ersatz
5. `onClick`-Navigation ohne `<a>`/`<Link>`
6. `<div>` oder `<span>` mit Klick-Handler statt `<button>`
7. `<img>` ohne Dimensionen
8. Große Arrays ohne Virtualisierung
9. Formularfelder ohne Label
10. Icon-Buttons ohne `aria-label`
11. Hartkodierte Datums-/Zahlenformate statt `Intl.*`
12. Ungerechtfertigtes `autoFocus` (besonders mobil)
13. Animierte GIFs statt Video/Stillbild
14. Reine Gesten-Aktion ohne Tipp- und Tastaturalternative

---

## Ausgabeformat von Sicht B

1. **Audit Health Score (`/20`)** als 5-Zeilen-Tabelle + Bewertungsband.
2. **Systemische Muster** (wiederkehrende Probleme über mehrere Dateien) & **Positive Funde**.
3. **Automatische Prüfungen** (Detektor/Axe/A11y-Tests: was lief, Zählung, Fehlalarme).
4. **Kompakte `file:line`-Liste** (gruppiert nach Datei, knapp & umsetzbar):

```text
## pfad/zur/Komponente.tsx

pfad/zur/Komponente.tsx:42 - [P1] Icon-Button ohne aria-label
pfad/zur/Komponente.tsx:67 - [P2] transition: all -> Eigenschaften explizit nennen
```
