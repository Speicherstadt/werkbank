---
name: "fork-pushen"
description: "Eigene Commits auf den Branch eines Pull Requests an ein Projekt der Speicherstadt pushen, der aus dem Fork einer anderen Person kommt. Vor jedem Push auf einen fremden Fork laden, in einer Cloud-Session vor dem ersten Versuch mit git push oder dem Hinzufügen des Forks."
---

# Auf einen fremden Fork pushen

Voraussetzung: Im Pull Request ist „Allow edits by maintainers“ an; sonst darum bitten oder als letzten Ausweg einen eigenen Pull Request anlegen (docs/mitwirken.md des Projekts, „Review“). Commits der beitragenden Person nie umschreiben, nie Force.

**Lokal** (Agent auf dem eigenen Rechner): `git push` auf den Branch des Forks geht mit den eigenen Zugangsdaten, etwa `git push https://github.com/<owner>/<repo> HEAD:<branch-des-pr>`. Der Rest dieses Skills betrifft nur Cloud-Sessions.

**Cloud-Session:** Sie schreibt meist nur in die Repositories, die beim Start als Quelle gewählt wurden. Ein Fork heißt meist wie das Original; neben dem Original lässt er sich oft nicht nachträglich hinzufügen (gleicher Name, gleiches Verzeichnis), und `git push` und das GitHub-Werkzeug lehnen ihn ab. Das nicht durchprobieren und niemanden bitten, von Hand zu pushen, sondern, wenn die Umgebung neue Sessions starten kann, sofort so:

1. Die Commits in dieser Session fertig machen und prüfen, auf einer lokalen Kopie des PR-Branches (`git fetch origin pull/<nr>/head:pr-<nr>`). Den erwarteten HEAD-SHA des Forks notieren.
2. `git format-patch <head-sha>..pr-<nr> --stdout` erzeugt den Patch mit Nachrichten, Autor und Trailern.
3. Eine **Hilfssession mit dem Fork als einziger Quelle** starten (Quelle `https://github.com/<owner>/<repo>`, ausgecheckt und Ziel-Branch der Branch des PR). Im Auftrag:
   - der Maintainer hat den Push angewiesen, sonst nichts ändern, keinen Pull Request, keine Kommentare;
   - der erwartete HEAD-SHA, bei Abweichung abbrechen;
   - der Patch zwischen Markern, anzuwenden mit `git am`;
   - die Kontrolle (`git log`, `git diff --stat`, bei Code der Linter nach Skill `checks`);
   - `git push origin HEAD:<branch-des-pr>` ohne Force und auf keinen anderen Branch, am Ende den neuen SHA melden.

   Ist der Patch zu groß für den Auftrag, die Commits auf den eigenen Branch der Session im Original-Repository pushen, ohne dessen Inhalt zu ändern (`git merge -s ours pr-<nr>`); der Branch darf keinen offenen Pull Request haben, sonst landen die Commits darin. Die Hilfssession holt sie statt `git am` mit `git fetch https://github.com/<org>/<repo> <eigener-branch>` und `git merge --ff-only <letzter-sha>`; ihr HEAD ist danach genau dieser SHA.
4. Auf das Ende der Hilfssession warten (sie meldet sich nicht unbedingt von selbst): ihren Status abfragen, bis sie nicht mehr arbeitet, dann ihre Antwort lesen. Dann den Push prüfen: `git ls-remote origin refs/pull/<nr>/head` zeigt den neuen SHA. Die Hilfssession danach beenden oder archivieren.

Kann die Umgebung keine Hilfssession starten, den Patch und die Anleitung aus Schritt 3 an die Person geben.
