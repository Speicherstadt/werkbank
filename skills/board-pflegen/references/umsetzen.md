# Umsetzen (Schritt 4, nach OK)

Teil von Skill `board-pflegen`.

IDs einmal holen:

```sh
gh project view <nr> --owner <owner> --format json --jq .id          # PROJECT_ID
gh project field-list <nr> --owner <owner> --format json             # Feld- und Options-IDs
```

| Schritt | Befehl |
| --- | --- |
| Issue hinzufügen | `gh project item-add <nr> --owner <owner> --url https://github.com/<owner>/<repo>/issues/<n> --format json --jq .id` |
| Entwurf anlegen | `gh project item-create <nr> --owner <owner> --title "…" --body "…" --format json --jq .id` |
| Auswahlfeld setzen | `gh project item-edit --project-id $PROJECT_ID --id <item> --field-id <feld> --single-select-option-id <option>` |
| Text setzen | `gh project item-edit --project-id $PROJECT_ID --id <item> --field-id <feld> --text "…"` |
| Labels setzen | `gh issue edit <n> --repo <owner>/<repo> --add-label <typ>,<thema>` |
| Zuweisen (Übernahme) | `gh issue edit <n> --repo <owner>/<repo> --add-assignee <login>`; der Workflow „Board“ schiebt die Karte nach „In Arbeit“ |

Position (das CLI kann es nicht): GraphQL, `afterId` ist die Karte darüber, ohne `afterId` ganz nach oben.

```sh
gh api graphql -f query='mutation($p:ID!,$i:ID!,$a:ID){updateProjectV2ItemPosition(input:{projectId:$p,itemId:$i,afterId:$a}){clientMutationId}}' \
  -f p=$PROJECT_ID -f i=<item> -f a=<item-darüber>
```

Eine Automatik des Projects (etwa „Item added to project“) setzt bei neuen Karten selbst einen Status, manchmal kurz nach dem eigenen Aufruf: Status zum Schluss noch einmal auslesen und bei Abweichung neu setzen. Nach Zuweisungen ebenso prüfen, dass die Karte in „In Arbeit“ steht.

## Archivieren

Nach einer fertigen Version, nach OK: Karten in „Erledigt“, deren Issue vor diesem Release geschlossen wurde. Sonst liest jeder Lauf die ganze Historie mit, und das Limit der GraphQL-Schnittstelle ist schnell erschöpft. Vorher `gh project item-list` als Datei sichern. Nicht löschen: Archivierte Karten behalten Status und Felder.

| Schritt | Befehl |
| --- | --- |
| Archivieren | `gh project item-archive <nr> --owner <owner> --id <item>` |
| Zurückholen | `gh project item-archive <nr> --owner <owner> --id <item> --undo` |

`gh project item-list` zeigt archivierte Karten nicht. Die Karte eines wieder geöffneten Issues steht am Issue:

```sh
gh api graphql -f query='query($n:Int!){repository(owner:"<owner>",name:"<repo>"){issue(number:$n){projectItems(first:20){nodes{id isArchived project{number}}}}}}' -F n=<n>
```
