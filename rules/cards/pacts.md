# Pacts

Source: `CARTAS CIVILES, MEJORAS Y PACTOS.pdf`. 10 cards, one of each. Offering and breaking them: [`diplo.offer.*`, `diplo.break.*`](../rulebook.md#diplomacy). *Signers* are the two players whose pact markers sit on the card; *outsiders* are everyone else.

| ID                              | Name (ES)                | Name (EN)                | Effect                                                                                                               | Breaks itself |
| ------------------------------- | ------------------------ | ------------------------ | -------------------------------------------------------------------------------------------------------------------- | ------------- |
| `pact.no-quarter`               | A degüello               | No Quarter               | Signers get one extra military action whenever they play a card.                                                     |               |
| `pact.military-alliance`        | Alianza militar          | Military Alliance        | After one signer plays a military card, the other may take a military action.                                        |               |
| `pact.informant-network`        | Red de informantes       | Informant Network        | Signers are spared the events aimed at their colour.                                                                 |               |
| `pact.conspiracy`               | Conjura                  | Conspiracy               | Outsiders lose all their troops, a victory point is gained (by whom: [`q.conspiracy-vp`](../open-questions.md#qconspiracy-vp)) and the pact breaks. | yes           |
| `pact.reinforcements`           | Refuerzos                | Reinforcements           | One signer gains a victory point. The other recruits three troops on their settlements or adjacent regions. The pact breaks. | yes     |
| `pact.blockade`                 | Bloqueo                  | Blockade                 | Outsiders can take only one action per card.                                                                         |               |
| `pact.mutual-support`           | Apoyo mutuo              | Mutual Support           | Signers may take one action at the start of their turn.                                                              |               |
| `pact.project-valkyrie`         | Proyecto Valquiria       | Project Valkyrie         | Signers recruit the war wagon on an empty region. An outsider who removes it gains a victory point.                  |               |
| `pact.trade-route`              | Ruta mercantil           | Trade Route              | Signers recruit the caravan on a settlement of one of them. An outsider who removes it gains a victory point.        |               |
| `pact.development-crackdown`    | Represión del desarrollo | Development Crackdown    | Outsiders cannot use their kingdom improvements or their civilians.                                                  |               |

## Project Valkyrie

`pact.project-valkyrie`. Full war-wagon rules: [`wagon.1`–`wagon.6`](../rulebook.md#military).

## Trade Route

`pact.trade-route`. Full caravan rules: [`caravan.1`–`caravan.8`](../rulebook.md#military).

## "Para 2" wordings

The PDF repeats two pacts, worded from one signer's point of view. They are not extra cards (the rulebook counts 10 pacts), most likely the same pacts reworded for the signer reading them. See [`q.pact-para-2`](../open-questions.md#qpact-para-2).

| ID                       | Name (ES)               | Effect                                                                                                                       |
| ------------------------ | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `pact.military-alliance` | Alianza militar para 2  | You may take a military action after the other player plays a military card.                                                 |
| `pact.reinforcements`    | Refuerzos para 2        | You decide: either you recruit three troops on settlements or adjacent regions and the other player gains a victory point, or the other way round. The pact breaks. |

Notes:

- `pact.reinforcements`: the "para 2" wording makes the split a choice (who recruits, who scores); the base text does not say who picks.
- Open questions: [`q.conspiracy-vp`](../open-questions.md#qconspiracy-vp) (who scores Conspiracy), [`q.no-quarter-card`](../open-questions.md#qno-quarter-card) (which cards trigger No Quarter).

## Original Spanish text

Verbatim from the PDF.

| ID                           | Texto                                                                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `pact.no-quarter`            | Los firmantes tienen una acción militar extra cuando jueguen una carta                                                         |
| `pact.military-alliance`     | Después de que uno de los firmantes juegue una carta militar, el otro puede realizar una acción militar                        |
| `pact.informant-network`     | Los firmantes se libran de los sucesos dirigidos contra su color                                                               |
| `pact.conspiracy`            | Los jugadores ajenos al pacto pierden todas sus tropas, ganan un Punto de Victoria y el pacto se rompe                         |
| `pact.reinforcements`        | Uno de los firmantes gana un Punto de Victoria. El otro recluta tres tropas en sus asentamientos o regiones adyacentes y el pacto se rompe |
| `pact.blockade`              | Los jugadores ajenos al pacto solo pueden hacer una acción por carta                                                           |
| `pact.mutual-support`        | Los firmantes pueden realizar una acción al inicio de su turno                                                                 |
| `pact.project-valkyrie`      | Los firmantes reclutan el "Carro de combate" en una región vacía. Si un jugador ajeno al pacto lo elimina, gana un Punto de Victoria |
| `pact.trade-route`           | Los firmantes reclutan la "Caravana" en el asentamiento de uno de ellos. Si un jugador ajeno al pacto la elimina, gana un Punto de Victoria |
| `pact.development-crackdown` | Los jugadores ajenos al pacto no pueden usar sus mejoras de reino ni sus civiles                                               |
| `pact.military-alliance` (para 2) | Puedes realizar una acción militar después de que el otro jugador juegue una carta militar                                |
| `pact.reinforcements` (para 2)    | Puedes decidir si reclutas tres tropas en asentamientos o regiones adyacentes y que el otro jugador gane un Punto de Victoria o viceversa. El pacto de rompe |
