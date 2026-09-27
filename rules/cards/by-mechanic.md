# Cards by mechanic

Source: `clasificación cartas storming.pdf`, the designers' own grouping of civilians, improvements and pacts. Use it to batch work: each group touches the same part of the engine.

A card can sit in two groups (marked *).

## Planning actions and events

Changes what goes on the PRESENT and FUTURE slots ([`round.*`](../rulebook.md#round)).

| ID                        | Kind        | Summary                                  |
| ------------------------- | ----------- | ---------------------------------------- |
| `civilian.strategist`     | Civilian    | Plans both actions on PRESENT            |
| `civilian.spy`            | Civilian    | Picks the event that goes on PRESENT     |
| `civilian.warlock`        | Civilian    | Plans one event together with an action  |
| `civilian.sheriff`        | Civilian    | Discards one revolt per turn; can block one event |
| `improvement.palace`      | Improvement | Plans one extra action on FUTURE         |
| `improvement.post-office` | Improvement | Moves your PRESENT action to first place |
| `pact.informant-network`  | Pact        | Protects from colour-aimed events        |

## Extra actions

| ID                       | Kind        | Summary                                          |
| ------------------------ | ----------- | ------------------------------------------------ |
| `civilian.philosopher`   | Civilian    | Extra action when a revolt is revealed           |
| `improvement.customs`    | Improvement | Extra build after another player's build         |
| `pact.military-alliance` | Pact        | Extra military after the other signer's military |
| `pact.no-quarter`        | Pact        | Extra military after playing an action card      |
| `pact.mutual-support`    | Pact        | Extra action before planning                     |

## Stronger action cards

| ID                       | Kind        | Summary                                          |
| ------------------------ | ----------- | ------------------------------------------------ |
| `civilian.alchemist`     | Civilian    | Special action card: Invention                   |
| `improvement.market`     | Improvement | One of the actions can be a wildcard             |
| `improvement.embassy`    | Improvement | Pacts cannot be refused (Diplomacy)              |
| `improvement.barracks`   | Improvement | Recruit outside settlements (Recruit)            |
| `improvement.university` | Improvement | Recruit three civilians; 1 VP for doing it *     |

## Acting on other players' cards

| ID                           | Kind        | Summary                         |
| ---------------------------- | ----------- | ------------------------------- |
| `civilian.henchman`          | Civilian    | Civilian action: removes a civilian |
| `civilian.saboteur`          | Civilian    | Civilian action: removes an improvement |
| `civilian.chancellor`        | Civilian    | Civilian action: hands out revolts |
| `improvement.library`        | Improvement | Copies another improvement      |
| `pact.development-crackdown` | Pact        | Cancels civilians and improvements |
| `pact.blockade`              | Pact        | Only one action per card        |

## Units on the board

| ID                      | Kind     | Summary                                   |
| ----------------------- | -------- | ----------------------------------------- |
| `civilian.general`      | Civilian | Uses one soldier twice                    |
| `pact.project-valkyrie` | Pact     | Special unit: war wagon                   |
| `pact.conspiracy`       | Pact     | Destroys every unit, +1 VP                |
| `pact.reinforcements`   | Pact     | Recruit 3 units or +1 VP *                |

## Victory points

| ID                       | Kind        | Summary                                     |
| ------------------------ | ----------- | ------------------------------------------- |
| `improvement.cathedral`  | Improvement | 1 VP; discards a revolt                     |
| `improvement.university` | Improvement | Recruit three civilians; 1 VP for doing it * |
| `improvement.theatre`    | Improvement | Hands out revolts; 1 VP per 3 revolts       |
| `pact.trade-route`       | Pact        | 1 VP per trade run                          |
| `pact.reinforcements`    | Pact        | Recruit 3 units or +1 VP *                  |
