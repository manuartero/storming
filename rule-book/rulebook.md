# Storming! — Rulebook

Created by Alfonso Ricardo Felipe López and Pablo Salinas.

English transcription of `REGLAS STORMING.pdf`, the original Spanish rulebook. Every rule has an ID (`build.village.1`): cite it in issues, commits and code comments. Card texts live in [`cards/`](cards/), terms in [`glossary.md`](glossary.md), and anything unclear in [`open-questions.md`](open-questions.md).

- 3–4 players
- Ages 10+
- For families and experienced players
- About 1 hour

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

- `setup.1` Each player picks a colour and takes their action deck and pieces.
- `setup.2` Shuffle the kingdom improvements, the civilians and the pacts, each type in its own deck. Draw two of each at random and place them face up next to the board.
- `setup.3` Leave the rest of the improvements, civilians and pacts in face-down decks.
- `setup.4` Place the victory points next to the board.
- `setup.5` Place the revolt cards, the invention card, the library marker, the war wagon and the caravan next to the board. They may be used during the game.
- `setup.6` Build an event deck from every event that does not name a player colour. Shuffle it and place it face down next to the board.
- `setup.7` Each player receives the colour-aimed event cards *Assassination*, *Corruption* and *Insurrection* for each opponent's colour:
  - `setup.7.3p` **3 players:** one copy of each of those three cards for each of the other two players. 6 in total, 3 per colour.
  - `setup.7.4p` **4 players:** one copy of each for each of the other three players. Then each player discards, at random and without looking, one card of each colour. 6 in total, 2 per colour.
- `setup.8` Choose the first player at random. They take the first-player marker.
- `setup.9` Each player places a village on one of the start regions marked "3" or "4" on the board, depending on the number of players.
- `setup.10` Shuffle the 3- or 4-player starting-setup cards and draw one.
- `setup.11` Following that card, place the terrain features on the board: forests, mountains and lakes.
- `setup.12` The grey regions of the board are only used in 4-player games. 3-player games use only the white regions.
- `setup.13` In turn order, each player places a soldier in a region adjacent to their starting village, and another village two regions away from their starting village.

## Round

- `round.1` The first player places, face down:
  - one action card on the PRESENT slot
  - one action card on the FUTURE slot
- `round.2` That player draws an EVENT card from the deck.
- `round.3` They place one EVENT card from their hand face down on the EVENTS slot. It can be the one they just drew or any other in their hand.
- `round.4` If the event deck runs out, shuffle the discards into a new deck.
- `round.5` The player on their left does the same, and so on until every player has played.
- `round.6` Shuffle the cards on the EVENTS slot. Place one on the PRESENT slot and one on the FUTURE slot.
- `round.7` Discard the remaining event cards face down.
- `round.8` Resolve the PRESENT slot.
- `round.9` The cards on the FUTURE slot move to the PRESENT slot.

### Resolving the PRESENT slot

- `present.1` Take all the cards on the PRESENT slot and put the pile face up back on the slot.
- `present.2` Resolve every card in order.
- `present.3` **Action card:** the player of that card's colour decides what to do.
  - `present.3.1` They may take one or two actions, depending on the card.
  - `present.3.2` Taking at least one action from the card is mandatory, if possible.
  - `present.3.3` When done, the player takes the action card back into their hand.
- `present.4` **Event card:** read it, apply its effects and discard it.

## Actions

The four action cards and what each allows: [`cards/actions.md`](cards/actions.md).

### Build

- `build.1` When you build something, you may apply its effects immediately.

**Settlements**

- **Village**
  - `build.village.1` You need a soldier in the region where you want to build it.
  - `build.village.2` You cannot build it in a region adjacent to another settlement.
  - `build.village.3` You cannot build it on forests, mountains or lakes.
- `build.town.1` **Town:** a village can be upgraded to a town.
- `build.city.1` **City:** a town can be upgraded to a city.

**Natural resources**

- `build.resource.1` You need a soldier in the region where you want to build a sawmill or a mine.
- **Sawmill**
  - `build.sawmill.1` Built in a region with a forest.
  - `build.sawmill.2` Each sawmill gives you one extra action when building.
- **Mine**
  - `build.mine.1` Built in a region with a mountain.
  - `build.mine.2` Each mine counts as one victory point.

**Walls**

- `build.wall.1` Built on settlements.
- `build.wall.2` They stop enemy troops from entering.

**Kingdom improvements** ([`cards/improvements.md`](cards/improvements.md))

- `build.improvement.1` You can only build the ones that are face up.
- `build.improvement.2` You cannot have more than two kingdom improvements at a time.
- `build.improvement.3` When you build one, draw a new improvement from the deck to take its place.
- `build.improvement.4` When an improvement is destroyed, it goes to the discard pile.

### Recruit

**Troops**

- `recruit.troop.1` You can only recruit on one of your own settlements.
- `recruit.troop.2` A troop can never be recruited in a region that already has a troop.
- `recruit.troop.3` Soldiers can be recruited in villages, towns and cities.
- `recruit.troop.4` Knights can only be recruited in towns and cities.
- `recruit.troop.5` Artillery can only be recruited in cities.

**Civilians** ([`cards/civilians.md`](cards/civilians.md))

- `recruit.civilian.1` You can only recruit the ones that are face up.
- `recruit.civilian.2` You cannot have more than two civilians at a time.
- `recruit.civilian.3` When you recruit a civilian, you may play its civilian action, if it has one.
- `recruit.civilian.4` When you recruit a civilian, draw a new one from the deck to take its place.
- `recruit.civilian.5` When a civilian is removed, it goes to the discard pile.

### Military

- `military.1` Each troop can only be used once per action card.

**Move**

- `move.1` Two troops can never share a region.
- `move.2` Soldiers and artillery can only move to adjacent regions.
- `move.3` Knights can move up to two regions away, and can pass through regions occupied by their own troops or settlements.
- `move.4` Only soldiers can enter regions with forests or mountains.
- `move.5` No troop can move onto a lake.

**Attack**

- `attack.1` Soldiers attack adjacent regions.
- `attack.2` Knights can move and attack up to two regions away.
- `attack.3` Artillery can attack any troop or wall one or two regions away, but cannot move when attacking.
- `attack.4` When you attack an enemy region:
  - `attack.4.1` You move into the attacked region (except artillery, which cannot move and attack at once).
  - `attack.4.2` If there is a troop, you remove it.
  - `attack.4.3` Any settlements, mines or sawmills there switch to your colour.
- `attack.5` When you attack a settlement with a wall:
  - `attack.5.1` You destroy the wall.
  - `attack.5.2` Your troop does not move; it stays in the region it attacked from.

**War wagon** (pact [`pact.project-valkyrie`](cards/pacts.md#project-valkyrie))

- `wagon.1` A special troop recruited by the players who sign the pact *Project Valkyrie*. It is recruited in an empty region.
- `wagon.2` The signing players control it with their military action cards.
- `wagon.3` It moves and attacks like normal artillery, but cannot enter settlements.
- `wagon.4` It can also move and attack (or attack and move) with a single military action.
- `wagon.5` If a player outside the pact destroys it, that player gains one victory point and the pact is broken.
- `wagon.6` If the pact is broken for any reason, the war wagon is removed from the board.

**Caravan** (pact [`pact.trade-route`](cards/pacts.md#trade-route))

- `caravan.1` A special troop recruited by the players who sign the pact *Trade Route*. It is recruited on one of their empty settlements.
- `caravan.2` The signing players control it with their military action cards.
- `caravan.3` It can only move to adjacent regions (forests and mountains included) and cannot attack.
- `caravan.4` No other troop can share a region with the caravan.
- `caravan.5` Each time the caravan reaches a settlement of a different player from the last settlement it visited, the signers gain one victory point.
- `caravan.6` If a player outside the pact destroys it, that player gains one victory point and the pact is broken.
- `caravan.7` If one of the signers destroys it, that signer gains a revolt and the pact is broken.
- `caravan.8` If the pact is broken for any reason, the caravan is removed from the board.

### Diplomacy

**First player**

- `diplo.first.1` You take the first-player marker. You are the first player from now on.

**Offer a pact** ([`cards/pacts.md`](cards/pacts.md))

- `diplo.offer.1` Take one of the face-up pact cards.
- `diplo.offer.2` Draw a new pact from the deck to take its place.
- `diplo.offer.3` Offer the pact to another player.
- `diplo.offer.4` If they refuse, the pact is discarded and you lose the action.
- `diplo.offer.5` If they accept, both of you put your pact markers on the card. Its effects apply as long as the pact is not broken.
- `diplo.offer.6` You can have pacts with several players, but only one with each of them.
- `diplo.offer.7` If a player attacks someone they have a pact with, the pact breaks automatically.

**Break a pact**

- `diplo.break.1` You can break any pact, whether you are part of it or not.
- `diplo.break.2` The pact card is discarded.
- `diplo.break.3` The players take their pact markers back.

**Civilian action**

- `diplo.civilian.1` Some civilians let you play special actions with the diplomacy action.

## Revolt!

- `revolt.1` When a player gains a revolt, they discard one of their action cards at random, place it face down near them and put a revolt card on top.
- `revolt.2` If they have no action cards, they keep the revolt. When they get an action card back, they put it face down under the revolt card.
- `revolt.3` A revolt can be played as if it were an action card, on the PRESENT or FUTURE slot. That way the player gets back the action card that was under it.
- `revolt.4` When a revolt is revealed while resolving the PRESENT slot, it is discarded with no further effect.

## Invention!

- `invention.1` When the invention is revealed, the player who has the civilian *Alchemist* chooses which card type it copies: build, recruit, military or diplomacy.
- `invention.2` They take the actions of the chosen card type.

## Events

Every event card: [`cards/events.md`](cards/events.md).

- `event.1` Some affect several players and are resolved in turn order.
  - Example: "Fire! All sawmills are destroyed."
- `event.2` Others target one specific player.
  - Example: "Assassination: player COLOUR loses all their walls and kingdom improvements."

## Winning the game

- `win.1` There are two ways to win:
  - `win.1.1` Conquer another player's last settlement.
  - `win.1.2` Reach seven victory points.
- `win.2` The game ends immediately when a player conquers another player's last settlement or reaches seven points.
- `win.3` **Tie-break:** if two players reach seven points at the same time, the one with more settlements wins. If still tied, the one with more cities wins. If still tied, the current first player wins, or else whoever comes first in turn order.

**Permanent victory points** (never lost):

- `vp.city` When you build a city.
- `vp.conquest` When you conquer a settlement.

**Other victory points:**

- `vp.rotating` The player with more settlements than anyone else gains one victory point. If another player later becomes the one with the most settlements, the point moves to them. (This is the *rotating victory point*.)
- `vp.mine` Each mine of your colour counts as one victory point. If you lose the mine, you lose the point.
- `vp.cathedral` Building the cathedral gives you one victory point. If you lose the cathedral, you lose the point.
- `vp.university` If you have the university, you gain one victory point each time you have recruited three civilians. You can score more than one point this way if you lose one or more civilians and recruit three again. These points are not lost if you lose the university.
- `vp.theatre` The theatre gives you victory points for every three revolts revealed. These points are not lost if you lose the theatre.
- `vp.pact` Some pacts give victory points. These points are not lost if the pact is broken.
