# Kingdom improvements

Source: `CARTAS CIVILES, MEJORAS Y PACTOS.pdf`. 10 cards, one of each. Building them: [`build.improvement.*`](../rulebook.md#build). "When you build it" effects apply at once ([`build.1`](../rulebook.md#build)).

| ID                        | Name (ES)       | Name (EN)     | Effect                                                                                                                                  | Rules            |
| ------------------------- | --------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `improvement.embassy`     | Embajada        | Embassy       | Players cannot refuse a pact with you. A player who breaks a pact with you takes a Revolt. When you build it, you may offer or break a pact. | `diplo.offer.4`  |
| `improvement.barracks`    | Cuartel         | Barracks      | You may recruit in regions with no troop that are adjacent to one of your settlements. When you build it, you may recruit a troop.       | `recruit.troop.1` |
| `improvement.customs`     | Aduana          | Customs House | You may take a build action when another player plays a build card.                                                                     |                  |
| `improvement.palace`      | Palacio         | Palace        | Right before the events are placed, you may put another action card on the FUTURE pile.                                                 | `round.6`        |
| `improvement.cathedral`   | Catedral        | Cathedral     | One victory point. When you build it, you may discard a Revolt and get the action card back.                                           | `vp.cathedral`   |
| `improvement.market`      | Mercado         | Market        | One of your actions may be of a different type from the action card you are playing.                                                    |                  |
| `improvement.post-office` | Casa de Correos | Post Office   | You may put your action card from the PRESENT pile at the bottom of the pile.                                                           | `present.1`      |
| `improvement.theatre`     | Teatro          | Theatre       | When you build it, every other player takes a Revolt. You gain a victory point for every three Revolts revealed.                        | `vp.theatre`     |
| `improvement.university`  | Universidad     | University    | You may recruit up to three civilians. When you do, you gain a victory point.                                                           | `recruit.civilian.2`, `vp.university` |
| `improvement.library`     | Biblioteca      | Library       | When you build it, and at the start of the turn, you may copy another player's kingdom improvement by placing the library marker on it. |                  |

Notes:

- The *Rules* column lists the rule each improvement bends or scores through.
- `improvement.post-office`: the classification sheet reads it as "your PRESENT action goes first". The pile is placed face down and flipped face up to resolve ([`present.1`](../rulebook.md#resolving-the-present-slot)), so the bottom card becomes the first one resolved.
- Open questions: [`q.theatre-count`](../open-questions.md#qtheatre-count) (Theatre), [`q.library-copy`](../open-questions.md#qlibrary-copy) (Library).

## Original Spanish text

Verbatim from the PDF. *"ganan se llevan"* / *"gana se lleva"* are editing leftovers in the source; read them as *se llevan* / *se lleva* ("take").

| ID                        | Texto                                                                                                                                  |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `improvement.embassy`     | No pueden negarse a pactar contigo. Si un jugador te rompe un pacto gana se lleva una Revuelta! Al construirla, puedes ofrecer o romper un pacto |
| `improvement.barracks`    | Puedes reclutar en regiones sin tropas y adyacentes a uno de tus asentamientos. Al construirlo, puedes reclutar una tropa               |
| `improvement.customs`     | Puedes realizar una acción de construir cuando otro jugador juegue una carta de construir                                              |
| `improvement.palace`      | Justo antes de que se coloquen los sucesos puedes poner otra carta de acción en el mazo futuro.                                        |
| `improvement.cathedral`   | Un Punto de Victoria. Al construirla, puedes descartar una Revuelta! y recuperar la carta de acción                                    |
| `improvement.market`      | Una de tus acciones puede ser de un tipo distinto al de la carta de acción que estés jugando                                           |
| `improvement.post-office` | Puedes colocar la carta de acción de "Presente" debajo del mazo                                                                        |
| `improvement.theatre`     | Al construirlo, los demás ganan se llevan una Revuelta! Ganas un Punto de Victoria por cada tres Revueltas! Que se revelen             |
| `improvement.university`  | Puedes reclutar hasta tres civiles. Cuando lo consigas, ganas un Punto de Victoria                                                     |
| `improvement.library`     | Al construirla y al inicio del turno puedes copiar una mejora de reino de otro jugador colocando el marcador de biblioteca sobre la carta elegida |
