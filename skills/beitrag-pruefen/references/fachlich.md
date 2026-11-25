# Fachliche Prüfung (Schritt 2, heikel)

Teil von Skill `beitrag-pruefen`.

- Jede fachliche Aussage im Diff sammeln (Regel, Grenzwert, Frist, Satz, Rundung, Feld eines Formats, Begriff einer Norm).
- Steht die Primärquelle im Kommentar und in der Commit-Nachricht? Fehlt sie, ist das ein Befund.
- Die Quelle selbst lesen und die Aussage daran prüfen, nicht nur ihr Dasein: Gesetz, Verordnung, Norm, Spezifikation, Formatbeschreibung, Dokumentation des Fremdsystems, im Stand, den das Projekt verwendet. Welche Quellen gelten und welche vorgeht, steht in den Konventionen des Projekts. Ratgeber und Blogs sind keine Quelle. GitHub-Quellen flach in einen temporären Ordner klonen.
- Gilt die Regel für alle Varianten, die das Projekt unterstützt (die docs/mitwirken.md des Projekts für Tests nennt), und für den richtigen Zeitraum (Rechtsstand, Übergangsregeln, Version des Formats)?
- **Gegenrechnen:** für den typischen Fall und einen Randfall (Storno, Jahreswechsel, Grenzwert, Teilmenge, was passt) das Ergebnis selbst aus der Quelle herleiten und mit den Erwartungen in den Tests des Pull Requests vergleichen. Stimmt eine Erwartung nicht mit der Quelle überein, ist das ein Befund; der Test dazu entsteht in `tdd-review`.
- Fehlt ein fachlicher Fall ganz, den die Quelle regelt und Nutzer des Projekts haben, ist das ein Befund für „Vollständig“.
- Ergebnis je Aussage: bestätigt (Quelle, Fundstelle), widerspricht (Zitat), nicht prüfbar (warum, z. B. braucht eine Fachperson). Nicht Prüfbares nicht als bestätigt melden.
