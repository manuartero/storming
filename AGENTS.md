Storming is a browser version of an original board game.

**rules live in [`rules.md`](rules.md).**

## Architecture

```
src/
  @types/storming.d.ts   global ambient domain types (Board, Tile, Card, GameContext, …)
  game-context/          React state: one provider, three plain-state hooks
  game-logic/            pure rule functions
  models/                factories and static data (NewCard, NewBuilding, PLAYER_CARDS, tiles)
  components/            features: <name>-controller.tsx + <name>.tsx view
  elements/              reusable UI primitives (Button, Dialog, Tile, Piece)
  services/              services (no UI)
```

- **The hooks are plain state:** named setters, no game logic, no validation. Rule decisions go in `game-logic/`, and the provider calls them before it updates state.
- **Controller / view split:** a controller reads `useGameContext()`, derives visual state (`infer-*.ts`) and passes props to a pure view. Views don't read the context.
- **Phases:** `planification` (each player puts a card on NEXT and on FUTURE, in player order) → `action` (resolve NEXT one card at a time) → back to `planification`.
- **Board:** a hex grid of offset coordinates keyed `"x,y"` (`TileID`).

## Code conventions

- **No `class`.** Use factory functions that return plain objects, with closures for encapsulation.
- **`type` over `interface`** for data shapes, props, option bags and config. Use `interface` only for a behavioural contract.
- **Infer return types.** Annotate one only when inference is too wide, breaks (recursion), or a public boundary needs a narrower literal type.
- **Object parameter for 2+ arguments:** `fn({ tile, piece }: { tile: TileID; piece: Piece })`. Single-parameter functions stay as they are.
- **`import type`** for type-only imports.
- **Filenames are kebab-case,** with the module first: `<module>.<role>.ts(x)` for new files (`foo.test.ts`).
- **No new `utils/`, `types/`, `helpers/` or `common/` folders.** Name folders by domain. Accepted non-domain folders: `lib/`, `data/`, `services/`, `styles/`.
- **Styling:** CSS modules (`*.module.css`) next to the component.

## Tests

- Tests sit next to the code as `*.test.ts(x)`.
- **The `describe` label shows what is under test:** `describe("foo()")` for a function, `describe("<Foo />")` for a component, `describe("foo{}")` for an object or module.
- Snapshot tests exist for the views.
- **e2e:** Playwright in `e2e/`, run in Docker with `npm run test:e2e` (`npm run test:e2e:local` without Docker). Specs are `e2e/app/<page>.<feature>.spec.ts`, and they find elements by role and accessible name, through the page object in `e2e/integration/`.

## Workflow

- Aim for small PRs: one rule or one UI change each, with tests. Branch from `main`.
- **Commits follow Conventional Commits,** and semantic-release versions `main` from them:
  - `feat` → minor
  - `fix`, `chore` and `style` → patch
  - `docs`, `test` and `refactor` → no release
