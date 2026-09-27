# Action cards

Source: `CARTAS ACCIONES.pdf`. 20 cards in total, 5 per colour (see [`q.action-deck`](../open-questions.md#qaction-deck)).

Each card lists the actions it allows. Playing one follows [`present.3`](../rulebook.md#resolving-the-present-slot): one or two actions, at least one if possible.

| ID                 | Card (ES)   | Card (EN) | Allows                                                              | Rules                                                       |
| ------------------ | ----------- | --------- | ------------------------------------------------------------------- | ----------------------------------------------------------- |
| `action.build`     | Construir   | Build     | Settlements · Sawmills / mines · Walls · Kingdom improvements       | `build.*`                                                   |
| `action.recruit`   | Reclutar    | Recruit   | Troops · Civilians                                                  | `recruit.*`                                                 |
| `action.military`  | Militar     | Military  | Move armies · Attack                                                | `military.*`, `move.*`, `attack.*`, `wagon.*`, `caravan.*`  |
| `action.diplomacy` | Diplomacia  | Diplomacy | First player · Offer a pact · Break a pact · Civilian action        | `diplo.*`                                                   |

Special cards that are played like an action card:

| ID                 | Card (ES)  | Card (EN)  | Effect                                                                     | Rules          |
| ------------------ | ---------- | ---------- | -------------------------------------------------------------------------- | -------------- |
| `action.revolt`    | Revuelta!  | Revolt!    | Returns the action card beneath it; discarded with no effect when revealed | `revolt.*`     |
| `action.invention` | Invento!   | Invention! | Copies any of the four action types; held by the Alchemist                 | `invention.*`  |
