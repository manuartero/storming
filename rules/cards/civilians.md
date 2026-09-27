# Civilians

Source: `CARTAS CIVILES, MEJORAS Y PACTOS.pdf`. 10 cards, one of each. Recruiting them: [`recruit.civilian.*`](../rulebook.md#recruit). A *civilian action* is played when recruited ([`recruit.civilian.3`](../rulebook.md#recruit)) or with a diplomacy action ([`diplo.civilian.1`](../rulebook.md#diplomacy)).

| ID                     | Name (ES)  | Name (EN)   | Effect                                                                                                                                                                                                                              | Kind           |
| ---------------------- | ---------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `civilian.strategist`  | Estratega  | Strategist  | You may put both of your action cards on whichever slot you want.                                                                                                                                                                  | passive        |
| `civilian.spy`         | Espía      | Spy         | You may look at the event cards before they are placed and choose which one goes on the PRESENT pile.                                                                                                                              | passive        |
| `civilian.warlock`     | Brujo      | Warlock     | At the start of the turn you may draw two event cards, discard one and play the other together with an action card.                                                                                                                | start of turn  |
| `civilian.general`     | General    | General     | You may use one soldier twice with the same military card.                                                                                                                                                                          | passive        |
| `civilian.sheriff`     | Alguacil   | Sheriff     | At the start of the turn you may discard a Revolt and get the action card back. You may sacrifice the Sheriff to avoid being affected by an event.                                                                                   | start of turn  |
| `civilian.alchemist`   | Alquimista | Alchemist   | You gain the Invention card (an action wildcard). When the Alchemist is removed, you lose the Invention card if it is in your hand. If you have already played it, discard it when revealed, unless at that moment you or another player has the Alchemist: they may use it. | passive        |
| `civilian.saboteur`    | Saboreador | Saboteur    | **Civilian action:** destroy another player's kingdom improvement. Afterwards, choose: lose the Saboteur, or keep it and take a Revolt.                                                                                              | civilian action |
| `civilian.henchman`    | Esbirro    | Henchman    | **Civilian action:** assassinate another player's civilian. Afterwards, choose: lose the Henchman, or keep it and take a Revolt.                                                                                                    | civilian action |
| `civilian.philosopher` | Filósofo   | Philosopher | When a Revolt is revealed, you may take an action.                                                                                                                                                                                 | trigger        |
| `civilian.chancellor`  | Canciller  | Chancellor  | **Civilian action:** every other player takes a Revolt.                                                                                                                                                                            | civilian action |

Notes:

- `civilian.saboteur`: the card says *Saboreador* ("taster"), the classification sheet says *Saboteadora* ("saboteur"). The effect matches saboteur, so the English name follows it.
- `civilian.alchemist` ties to [`invention.*`](../rulebook.md#invention).
- Open questions: [`q.civilian-sacrifice`](../open-questions.md#qcivilian-sacrifice) (Sheriff), [`q.philosopher-action`](../open-questions.md#qphilosopher-action) (Philosopher).

## Original Spanish text

Verbatim from the PDF. *"ganar llevarte"* / *"ganan se llevan"* are editing leftovers in the source; read them as *llevarte* / *se llevan* ("take").

| ID                     | Texto                                                                                                                                                                                                                      |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `civilian.strategist`  | Puedes poner las dos cartas de acción en la casilla que quieras                                                                                                                                                            |
| `civilian.spy`         | Puedes ver las cartas de suceso antes de que se coloquen y decidir cuál va en el mazo "Presente"                                                                                                                           |
| `civilian.warlock`     | Al inicio del turno puedes robar dos cartas de suceso, descartar una y jugar la otra junto a una carta de acción                                                                                                           |
| `civilian.general`     | Puedes usar un soldado dos veces con la misma carta militar                                                                                                                                                                |
| `civilian.sheriff`     | Al inicio del turno puedes descartar una Revuelta! y recuperar la carta de acción. Puedes sacrificarlo para no verte afectado por un suceso                                                                                 |
| `civilian.alchemist`   | Ganas la carta de Invento! (Comodín de Acción) Cuando el Alquimista es eliminado pierdes la carta de Invento! si está en tu mano. Si la has jugado, al revelarse descártala (Aunque si en ese momento, tú u otro jugador tuviese al Alquimista, podría usar la carta de Invento!) |
| `civilian.saboteur`    | Acción civil: Puedes destruir una mejora de reino de otro jugador. Tras realizar su acción, puedes elegir entre perderlo, o conservarlo y ganar llevarte una Revuelta!                                                      |
| `civilian.henchman`    | Acción civil: Puedes asesinar un civil de otro jugador. Tras realizar su acción, puedes elegir entre perderlo, o conservarlo y ganar llevarte una Revuelta!                                                                 |
| `civilian.philosopher` | Cuando se revela una Revuelta! Puedes realizar una acción                                                                                                                                                                  |
| `civilian.chancellor`  | Acción civil: Los demás jugadores ganan se llevan una Revuelta!                                                                                                                                                            |
