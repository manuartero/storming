# AGENTS.md

Storming is a browser version of *Storming!*, an original board game by Alfonso Ricardo Felipe López and Pablo Salinas. It is played hot-seat: every player shares one screen.

**The rules live in [`rules.md`](rules.md).** Read the sections you touch before changing game logic, and use its glossary to map rule terms to code names (village → `"tower"`, PRESENT → `next`, …).

## Commands

| Command              | What it does                                    |
| -------------------- | ----------------------------------------------- |
| `npm run dev`        | Vite dev server on http://localhost:3000        |
| `npm test`           | Jest (jsdom), unit and snapshot tests           |
| `npx tsc --noEmit`   | Type check                                      |
| `npm run build`      | `tsc && vite build` into `build/`               |
| `npm run blue-ball`  | Test + build: run this before opening a PR      |

Node ≥ 20.19. There is no lint script.

## Architecture

```
src/
  @types/storming.d.ts   global ambient domain types (Board, Tile, Card, GameContext, …)
  game-context/          React state: one provider, three plain-state hooks
  game-logic/            pure rule functions (tested)
  models/                factories and static data (NewCard, NewBuilding, PLAYER_CARDS, tiles)
  components/            features: <name>-controller.tsx + <name>.tsx view
  elements/              reusable UI primitives (Button, Dialog, Tile, Piece)
  services/db.ts         savegames in localStorage
```

- **State:** `GameContextProvider` (`game-context/use-game-context.tsx`) combines `useBoard`, `useTimeline` and `usePlayers`. The context exposes game actions: `plan`, `submitPlanification`, `build`, `move`, `recruit`, `skip`, `loadSavegame`.
- **The hooks are plain state:** named setters, no game logic, no validation. Rule decisions go in `game-logic/`, and the provider calls them before it updates state.
- **Controller / view split:** a controller reads `useGameContext()`, derives visual state (`infer-*.ts`) and passes props to a pure view. Views don't read the context.
- **Phases:** `planification` (each player puts a card on NEXT and on FUTURE, in player order) → `action` (resolve NEXT one card at a time) → back to `planification`. `setup` is declared but not implemented yet.
- **Board:** a hex grid of offset coordinates keyed `"x,y"` (`TileID`). Neighbours come from `game-logic/tiles-in-range.ts`.
- **Types:** the domain types are global (no import needed) in `src/@types/storming.d.ts`. Add new domain types there, next to the related ones.
- **Imports:** `baseUrl` is `src`, so import `game-logic/score-check`, not `../../game-logic/score-check`.
- **Logging:** use `warnInconsistentState()` from `utils/console` for impossible states, and `console.info` for game events.

## Code conventions

Follow these in new or changed code. Existing code breaks some of them (`NewCard(type, player)`, `utils/`, `*-controller.tsx`); fix that in a dedicated refactor PR, not along the way.

- **No `class`.** Use factory functions that return plain objects, with closures for encapsulation. For custom errors, write a factory `fooError(msg)` that returns a tagged `Error`, plus a predicate `isFooError(err)` that checks `err.name`.
- **`type` over `interface`** for data shapes, props, option bags and config. Use `interface` only for a behavioural contract.
- **Infer return types.** Annotate one only when inference is too wide, breaks (recursion), or a public boundary needs a narrower literal type.
- **Object parameter for 2+ arguments:** `fn({ tile, piece }: { tile: TileID; piece: Piece })`. Single-parameter functions stay as they are.
- **`import type`** for type-only imports.
- **Filenames are kebab-case,** with the module first: `<module>.<role>.ts(x)` for new files (`foo.test.ts`).
- **No new `utils/`, `types/`, `helpers/` or `common/` folders.** Name folders by domain. Accepted non-domain folders: `lib/`, `data/`, `services/`, `styles/`.
- **Styling:** CSS modules (`*.module.css`) next to the component. Player colours come from `styles/colors.css`.

## Tests

- Tests sit next to the code as `*.test.ts(x)`. Rule changes in `game-logic/` need unit tests.
- **The `describe` label shows what is under test:** `describe("foo()")` for a function, `describe("<Foo />")` for a component, `describe("foo{}")` for an object or module.
- Snapshot tests exist for the views. If a change is intended, update them with `npx jest -u` and review the diff.

## Workflow

- Aim for small PRs: one rule or one UI change each, with tests. Branch from `main`.
- **Commits follow Conventional Commits,** and semantic-release versions `main` from them:
  - `feat` → minor
  - `fix`, `chore` and `style` → patch
  - `docs`, `test` and `refactor` → no release
- CI (`.github/workflows/blue-ball.yml`) runs the tests and the build on every PR to `main`.
- When a PR implements a rule, update the status list below.

## Implementation status vs `rules.md`

Implemented:

- hot-seat play for 4 players
- planning of NEXT and FUTURE cards
- build: village → town → city, and walls
- recruit: a soldier anywhere, a knight in a town or city
- move: soldiers 1 region, knights 2
- terrain limits: no lakes for anyone; forests and mountains for soldiers only
- a point for conquering a settlement
- save and load

Not implemented yet:

- village placement limits: `isBuildingPlot()` is a stub that always returns `true`
- walls blocking movement, and the attack-on-a-wall rule
- the knight's pass-through rule
- the permanent point for building a city
- the rotating point for the most settlements (`greatestEmpirePoint` is legacy and uses a made-up threshold of 3)
- the win condition
- diplomacy: the `diplo` card does nothing
- events, revolts and the invention
- civilians, kingdom improvements and pacts (`Marketplace` and `PlayerInventory` are placeholders)
- artillery, mines and sawmills
- setup, including 3-player games
- two actions per card

## Known gotchas

- `useTimeline`'s `nextActiveCard` and `startPlanningPhase` read `next` and `future` from the closure instead of using functional updates. Be careful when one action triggers more than one transition.
- `listSavegames()` returns every localStorage key, not only savegames.
- `components/board/deprecated/` holds unused assets.
