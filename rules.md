# Storming! — Rules

Created by Alfonso Ricardo Felipe López and Pablo Salinas.

English transcription of the original Spanish rulebook (`REGLAS STORMING.pdf`). This file is now the source of truth for the rules. The card lists are still in Spanish, under `rule-book/`.

- 3–4 players
- Ages 10+
- For families and experienced players
- About 1 hour

## Glossary: rulebook → code

| Rulebook (ES)         | Rulebook (EN)             | Code                            |
| --------------------- | ------------------------- | ------------------------------- |
| Aldea                 | Village                   | `BuildingType` `"tower"`        |
| Poblado               | Town                      | `BuildingType` `"castle"`       |
| Ciudad                | City                      | `BuildingType` `"citadel"`      |
| Asentamiento          | Settlement (any of above) | `Tile.building`                 |
| Muralla               | Wall                      | `Building.hasWalls`             |
| Soldado               | Soldier                   | `PieceType` `"soldier"`         |
| Caballero             | Knight                    | `PieceType` `"knight"`          |
| Artillería            | Artillery                 | —                               |
| Tropa                 | Troop                     | `Piece`                         |
| Región                | Region                    | `Tile` / `TileID`               |
| Bosque / Montaña / Lago | Forest / Mountain / Lake | `TerrainType`                  |
| Serrería / Mina       | Sawmill / Mine            | —                               |
| Construir             | Build                     | `ActionCardType` `"build"`      |
| Reclutar              | Recruit                   | `ActionCardType` `"recruit"`    |
| Militar (mover/atacar)| Military (move/attack)    | `ActionCardType` `"move"`       |
| Diplomacia            | Diplomacy                 | `ActionCardType` `"diplo"`      |
| Casilla PRESENTE      | PRESENT slot              | `GameContext.next`              |
| Casilla FUTURO        | FUTURE slot               | `GameContext.future`            |
| Sucesos               | Events                    | `EventCard`                     |
| Revuelta              | Revolt                    | —                               |
| Invento               | Invention                 | —                               |
| Civiles               | Civilians (personas)      | —                               |
| Mejoras de reino      | Kingdom improvements      | —                               |
| Pactos                | Pacts                     | —                               |
| Jugador inicial       | First player              | `players[0]`                    |
| Punto de victoria     | Victory point             | `PlayerStatus.points`           |

## Components

**170 cards:**

- 28 general events
- 60 events aimed at one colour
- 20 action cards
- 11 revolts
- 1 invention
- 10 civilians
- 10 kingdom improvements
- 10 pacts
- 20 starting-setup cards

**4 sets (one per colour) of:**

- 5 soldiers
- 3 knights
- 2 artillery
- 5 villages
- 4 towns
- 3 cities
- 3 sawmills/mines
- 3 walls
- 3 pact markers

**Shared:**

- 1 war wagon
- 1 caravan
- 2 forests
- 1 mountain
- 4 lakes
- 1 first-player marker
- 24 victory points
- 1 rotating victory point
- 1 library marker
- 1 board
- 1 rulebook

## Setup

- Each player picks a colour and takes their action deck and pieces.
- Shuffle the kingdom improvements, the civilians and the pacts, each type in its own deck. Draw two of each at random and place them face up next to the board.
- Leave the rest of the improvements, civilians and pacts in face-down decks.
- Place the victory points next to the board.
- Place the revolt cards, the invention card, the library marker, the war wagon and the caravan next to the board. They may be used during the game.
- Build an event deck from every event that does not name a player colour. Shuffle it and place it face down next to the board.
- Each player receives the colour-aimed event cards *Assassination* (atentado), *Corruption* (corrupción) and *Insurrection* (insurrección) for each opponent's colour:
  - **3 players:** one copy of each of those three cards for each of the other two players. 6 in total, 3 per colour.
  - **4 players:** one copy of each for each of the other three players. Then each player discards, at random and without looking, one card of each colour. 6 in total, 2 per colour.
- Choose the first player at random. They take the first-player marker.
- Each player places a village on one of the start regions marked "3" or "4" on the board, depending on the number of players.
- Shuffle the 3- or 4-player starting-setup cards and draw one.
- Following that card, place the terrain features on the board: forests, mountains and lakes.
- The grey regions of the board are only used in 4-player games. 3-player games use only the white regions.
- In turn order, each player places a soldier in a region adjacent to their starting village, and another village two regions away from their starting village.

## Round

1. The first player places, face down:
   - one action card on the PRESENT slot
   - one action card on the FUTURE slot
2. That player draws an EVENT card from the deck.
3. They place one EVENT card from their hand face down on the EVENTS slot. It can be the one they just drew or any other in their hand.
4. If the event deck runs out, shuffle the discards into a new deck.
5. The player on their left does the same, and so on until every player has played.
6. Shuffle the cards on the EVENTS slot. Place one on the PRESENT slot and one on the FUTURE slot.
7. Discard the remaining event cards face down.
8. Resolve the PRESENT slot.
9. The cards on the FUTURE slot move to the PRESENT slot.

### Resolving the PRESENT slot

Take all the cards on the PRESENT slot and put the pile face up back on the slot. Resolve every card in order:

- **Action card:** the player of that card's colour decides what to do.
  - They may take one or two actions, depending on the card.
  - Taking at least one action from the card is mandatory, if possible.
  - When done, the player takes the action card back into their hand.
- **Event card:** read it, apply its effects and discard it.

## Actions

### Build

When you build something, you may apply its effects immediately.

**Settlements**

- **Village**
  - You need a soldier in the region where you want to build it.
  - You cannot build it in a region adjacent to another settlement.
  - You cannot build it on forests, mountains or lakes.
- **Town:** a village can be upgraded to a town.
- **City:** a town can be upgraded to a city.

**Natural resources**

You need a soldier in the region where you want to build a sawmill or a mine.

- **Sawmill**
  - Built in a region with a forest.
  - Each sawmill gives you one extra action when building.
- **Mine**
  - Built in a region with a mountain.
  - Each mine counts as one victory point.

**Walls**

- Built on settlements.
- They stop enemy troops from entering.

**Kingdom improvements**

- You can only build the ones that are face up.
- You cannot have more than two kingdom improvements at a time.
- When you build one, draw a new improvement from the deck to take its place.
- When an improvement is destroyed, it goes to the discard pile.

### Recruit

**Troops**

- You can only recruit on one of your own settlements.
- A troop can never be recruited in a region that already has a troop.
- Soldiers can be recruited in villages, towns and cities.
- Knights can only be recruited in towns and cities.
- Artillery can only be recruited in cities.

**Civilians**

- You can only recruit the ones that are face up.
- You cannot have more than two civilians at a time.
- When you recruit a civilian, you may play its civilian action, if it has one.
- When you recruit a civilian, draw a new one from the deck to take its place.
- When a civilian is removed, it goes to the discard pile.

### Military

Each troop can only be used once per action card.

**Move**

- Two troops can never share a region.
- Soldiers and artillery can only move to adjacent regions.
- Knights can move up to two regions away, and can pass through regions occupied by their own troops or settlements.
- Only soldiers can enter regions with forests or mountains.
- No troop can move onto a lake.

**Attack**

- Soldiers attack adjacent regions.
- Knights can move and attack up to two regions away.
- Artillery can attack any troop or wall one or two regions away, but cannot move when attacking.
- When you attack an enemy region:
  - You move into the attacked region (except artillery, which cannot move and attack at once).
  - If there is a troop, you remove it.
  - Any settlements, mines or sawmills there switch to your colour.
- When you attack a settlement with a wall:
  - You destroy the wall.
  - Your troop does not move; it stays in the region it attacked from.

**War wagon**

- A special troop recruited by the players who sign the pact *Project Valkyrie* (Proyecto Valquiria). It is recruited in an empty region.
- The signing players control it with their military action cards.
- It moves and attacks like normal artillery, but cannot enter settlements.
- It can also move and attack (or attack and move) with a single military action.
- If a player outside the pact destroys it, that player gains one victory point and the pact is broken.
- If the pact is broken for any reason, the war wagon is removed from the board.

**Caravan**

- A special troop recruited by the players who sign the pact *Trade Route* (Ruta mercantil). It is recruited on one of their empty settlements.
- The signing players control it with their military action cards.
- It can only move to adjacent regions (forests and mountains included) and cannot attack.
- No other troop can share a region with the caravan.
- Each time the caravan reaches a settlement of a different player from the last settlement it visited, the signers gain one victory point.
- If a player outside the pact destroys it, that player gains one victory point and the pact is broken.
- If one of the signers destroys it, that signer gains a revolt and the pact is broken.
- If the pact is broken for any reason, the caravan is removed from the board.

### Diplomacy

**First player**

- You take the first-player marker. You are the first player from now on.

**Offer a pact**

- Take one of the face-up pact cards.
- Draw a new pact from the deck to take its place.
- Offer the pact to another player.
- If they refuse, the pact is discarded and you lose the action.
- If they accept, both of you put your pact markers on the card. Its effects apply as long as the pact is not broken.
- You can have pacts with several players, but only one with each of them.
- If a player attacks someone they have a pact with, the pact breaks automatically.

**Break a pact**

- You can break any pact, whether you are part of it or not.
- The pact card is discarded.
- The players take their pact markers back.

**Civilian action**

- Some civilians let you play special actions with the diplomacy action.

## Revolt!

- When a player gains a revolt, they discard one of their action cards at random, place it face down near them and put a revolt card on top.
- If they have no action cards, they keep the revolt. When they get an action card back, they put it face down under the revolt card.
- A revolt can be played as if it were an action card, on the PRESENT or FUTURE slot. That way the player gets back the action card that was under it.
- When a revolt is revealed while resolving the PRESENT slot, it is discarded with no further effect.

## Invention!

- When the invention is revealed, the player who has the civilian *Alchemist* (Alquimista) chooses which card type it copies: build, recruit, military or diplomacy.
- They take the actions of the chosen card type.

## Events

- Some affect several players and are resolved in turn order.
  - Example: "Fire! All sawmills are destroyed."
- Others target one specific player.
  - Example: "Assassination: player COLOUR loses all their walls and kingdom improvements."

## Winning the game

There are two ways to win:

- Conquer another player's last settlement.
- Reach seven victory points.

**Permanent victory points** (never lost):

- When you build a city.
- When you conquer a settlement.

**Other victory points:**

- The player with more settlements than anyone else gains one victory point. If another player later becomes the one with the most settlements, the point moves to them. (This is the *rotating victory point*.)
- Each mine of your colour counts as one victory point. If you lose the mine, you lose the point.
- Building the cathedral gives you one victory point. If you lose the cathedral, you lose the point.
- If you have the university, you gain one victory point each time you have recruited three civilians. You can score more than one point this way if you lose one or more civilians and recruit three again. These points are not lost if you lose the university.
- The theatre gives you victory points for every three revolts revealed. These points are not lost if you lose the theatre.
- Some pacts give victory points. These points are not lost if the pact is broken.

The game ends immediately when a player conquers another player's last settlement or reaches seven points.

**Tie-break:** if two players reach seven points at the same time, the one with more settlements wins. If still tied, the one with more cities wins. If still tied, the current first player wins, or else whoever comes first in turn order.
