# Sicht B: Technik, Barrierefreiheit und Bedien-Hygiene

Systematische Prüfung von CSS-Tokens, Basis-Komponenten und Ansichten im Code. Jeder Befund nennt Datei, Zeile und die verletzte Anforderung (WCAG, `DESIGN.md` oder konkretes Fehlverhalten).

## 1. Kontrast und Farbe

- **Textkontrast:** normaler Text ≥ 4,5:1, großer Text ≥ 3:1 in Hell und Dunkel – besonders Nebentext auf getönten Flächen (`--muted`, `--accent`, `--warning-surface`, Badges, Schritt-Nummern).
- **Bedienelemente (WCAG 1.4.11):** Rahmen von Eingaben, Checkboxen, umrandeten Knöpfen, Auswahlen und Eingabepunkten erreichen ≥ 3:1 gegen die umliegende Fläche (eigenes Token statt schwacher Trennlinien-Farbe).
- **Dark Mode vollständig:** native `<select>`/`<option>`-Flächen und Pfeile lesbar, Canvas-/SVG-Elemente reagieren auf Theme-Wechsel, `<meta name="theme-color">` synchron und bei manueller Wahl **vor** statischen `media`-Query-Metas im `<head>` (HTML-Baumreihenfolge).
- **Kein Flackern beim Laden:** gespeichertes Theme wird vor dem ersten Paint gesetzt.

## 2. Tastatur, Fokus und Semantik

- **Einstieg & Landmarks:** Skip-Link („Zum Inhalt“) auf `<main id="main" tabindex="-1">`, eindeutige `aria-label` auf mehrfachen `<nav>`-Bereichen, `aria-current="page"` auch auf Unterrouten.
- **Sichtbarer Fokus:** jedes interaktive Element hat einen klaren `focus-visible`-Ring; nie `outline: none` ohne Ersatz.
- **Dialoge, Popover, Menüs, Vollbild:**
  - Fokus geht beim Öffnen hinein und beim Schließen zurück auf den Auslöser; `Esc` schließt.
  - Vollbild- oder modale Ebenen sperren den Hintergrund (`showModal()` oder `inert` auf Geschwister-Landmarks).
  - Auslöser setzen `aria-expanded` und `aria-controls`; dynamische Rollen und Attribute passen zusammen (kein `aria-modal` ohne passende Rolle).
  - Pfeil-, `Home`- und `End`-Navigation überspringt deaktivierte Elemente (`disabled`).
  - Geschlossene Popover-Inhalte müllen keine `getByLabel`-Abfragen oder Screenreader voll.
- **WCAG 2.5.3 (Label in Name):** trägt ein sichtbarer Knopf Text, enthält sein zugänglicher Name diesen Text (kein `aria-label`, das den sichtbaren Namen überschreibt).
- **Horizontales Scrollen per Tastatur:** `overflow-x-auto`-Hüllen um breite Tabellen/Raster sind mit `tabindex="0"` und Fokus-Ring erreichbar.

## 3. Touch, Maus und Responsive

- **Berührungsziele:** mobil (unter `md`) mindestens 44 × 44 px für alle primären und häufigen Bedienelemente; enge Inline-Pills/Chips mindestens 24 px (WCAG 2.5.8).
- **Touch-Verhalten:** `touch-action: manipulation` gegen 300-ms-Doppeltipp-Zoom; `overscroll-contain` in Dialogen, Menüs, Popovers und Vollbild-Overlays gegen Hintergrund-Scrollen.
- **Keine Hover-Only-Aktionen:** Elemente, die erst bei Hover erscheinen (`+`, Griff, Zeilenaktionen), werden nur unter `@media (hover: hover)` ausgeblendet – auf Touch-Geräten und bei Tastaturfokus sichtbar.
- **Kein Auslösen auf `pointerdown`:** Auswahllisten/Comboboxen wählen auf `click` (mit `onMouseDown` gegen Fokusverlust), damit Rechtsklick und Touch-Scroll nicht versehentlich auswählen.
- **Engstellen & lange Sprachen:** keine festen Pixelbreiten, die schmale Viewports sprengen (`max-w-[…]` + `w-full`); keine abgeschnittenen Felder oder überlaufenden Knopfreihen bei 1024 px und langen Übersetzungen.

## 4. Formulare und Schutz vor Fehlklicks

- **Doppel-Submit verhindern:** laufende Anfragen deaktivieren den Absende-Knopf.
- **Eingabehilfen:** `spellcheck="false"` (als String, falls das Framework boolesches `false` entfernt) und `autocapitalize="off"` auf E-Mail, Kennung, Codes; passende `autocomplete`- und `inputmode`-Werte.
- **Destruktive Aktionen:** Löschen/Entfernen von Nutzerdaten mit Bestätigungsdialog oder Rückgängig-Möglichkeit.

## 5. Bewegung und Technik

- **Animationen:** nur GPU-freundliche Eigenschaften (`transform`, `opacity`) statt `width`/`height`/`top`/`left`.
- **Reduzierte Bewegung:** `@media (prefers-reduced-motion: reduce)` schaltet Bewegung/Dauer ab, ohne Farb- oder Deckkraft-Rückmeldung zu zerstören.
- **Schwebende Elemente:** native Dialog-/Popover-API und CSS Anchor Positioning statt manueller `scroll`/`resize`-Positionierung mit `getBoundingClientRect()`, damit Overlays in Dialogen nicht abgeschnitten werden.

## 6. Sprache und RTL

- **Übersetzungen:** jeder sichtbare Text und jedes `aria-label` in allen Sprachdateien des Projekts (keine hartkodierten englischen/deutschen Strings in Komponenten); Datums-/Feldnamen über `Intl`.
- **RTL & Zahlen:** logische CSS-Klassen (`ps-`, `pe-`, `ms-`, `me-`, `text-start`, `text-end`), `dir="ltr"` auf Uhrzeiten, Zahlen, Salden und Codes, `translate="no"` auf Marken-/Eigennamen, gespiegelte Links/Rechts-Pfeile in RTL-Kalendern.

## Ausgabe von Sicht B

- **Befunde:** Tabelle oder Liste geordnet nach Schwere (hoch / mittel / niedrig), jeweils mit **Datei:Zeile**, **Kategorie**, **konkretem Fehler** und **präzisem Fix**.
- **Automatische Prüfungen:** Ergebnis vorhandener A11y-/Lint-/UI-Tests (oder Hinweis, was lokal nicht lief).
