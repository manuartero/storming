# Glossary

Spanish (source PDFs) → English (these docs) → code. "—" means the code has nothing for it yet.

## Board and pieces

| Rulebook (ES)           | English                   | Code                       |
| ----------------------- | ------------------------- | -------------------------- |
| Región                  | Region                    | `Tile` / `TileID`          |
| Bosque / Montaña / Lago | Forest / Mountain / Lake  | `TerrainType`              |
| Aldea                   | Village                   | `BuildingType` `"tower"`   |
| Poblado                 | Town                      | `BuildingType` `"castle"`  |
| Ciudad                  | City                      | `BuildingType` `"citadel"` |
| Asentamiento            | Settlement (any of above) | `Tile.building`            |
| Muralla                 | Wall                      | `Building.hasWalls`        |
| Serrería / Mina         | Sawmill / Mine            | —                          |
| Tropa                   | Troop                     | `Piece`                    |
| Soldado                 | Soldier                   | `PieceType` `"soldier"`    |
| Caballero               | Knight                    | `PieceType` `"knight"`     |
| Artillería              | Artillery                 | —                          |
| Carro de combate        | War wagon                 | —                          |
| Caravana                | Caravan                   | —                          |

## Turn structure

| Rulebook (ES)           | English              | Code                  |
| ----------------------- | -------------------- | --------------------- |
| Ronda                   | Round                | —                     |
| Casilla PRESENTE        | PRESENT slot         | `GameContext.next`    |
| Casilla FUTURO          | FUTURE slot          | `GameContext.future`  |
| Casilla de SUCESOS      | EVENTS slot          | —                     |
| Mazo "Presente"/"Futuro"| PRESENT / FUTURE pile (the cards on that slot) | — |
| Jugador inicial         | First player         | `players[0]`          |
| Orden de turno          | Turn order           | `players`             |

## Cards

| Rulebook (ES)             | English                    | Code                            | Card list                                    |
| ------------------------- | -------------------------- | ------------------------------- | -------------------------------------------- |
| Carta de acción           | Action card                | `ActionCard`                    | [`cards/actions.md`](cards/actions.md)       |
| Construir                 | Build                      | `ActionCardType` `"build"`      | [`cards/actions.md`](cards/actions.md)       |
| Reclutar                  | Recruit                    | `ActionCardType` `"recruit"`    | [`cards/actions.md`](cards/actions.md)       |
| Militar (mover/atacar)    | Military (move/attack)     | `ActionCardType` `"move"`       | [`cards/actions.md`](cards/actions.md)       |
| Diplomacia                | Diplomacy                  | `ActionCardType` `"diplo"`      | [`cards/actions.md`](cards/actions.md)       |
| Suceso                    | Event                      | `EventCard`                     | [`cards/events.md`](cards/events.md)         |
| Suceso dirigido (COLOR)   | Colour-aimed event         | —                               | [`cards/events.md`](cards/events.md)         |
| Revuelta                  | Revolt                     | —                               | [`cards/actions.md`](cards/actions.md)       |
| Invento                   | Invention                  | —                               | [`cards/actions.md`](cards/actions.md)       |
| Civil                     | Civilian                   | —                               | [`cards/civilians.md`](cards/civilians.md)   |
| Acción civil              | Civilian action            | —                               | [`cards/civilians.md`](cards/civilians.md)   |
| Mejora de reino           | Kingdom improvement        | —                               | [`cards/improvements.md`](cards/improvements.md) |
| Pacto                     | Pact                       | —                               | [`cards/pacts.md`](cards/pacts.md)           |
| Firmantes / ajenos al pacto | Signers / outsiders      | —                               | [`cards/pacts.md`](cards/pacts.md)           |
| Carta de inicio           | Starting-setup card        | —                               | not transcribed ([`q.setup-cards`](open-questions.md#qsetup-cards)) |

## Scoring

| Rulebook (ES)          | English                 | Code                   |
| ---------------------- | ----------------------- | ---------------------- |
| Punto de victoria      | Victory point (VP)      | `PlayerStatus.points`  |
| Punto rotante          | Rotating victory point  | —                      |
| Ganar / llevarse una revuelta | Take a revolt    | —                      |
