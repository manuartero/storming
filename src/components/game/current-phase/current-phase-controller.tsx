import { useGameContext } from "contexts";
import { CurrentPhase } from "./current-phase";
import { mustSkip } from "./must-skip";

/**
 * Renders depends on:
 *  - `useGameContext()`
 *
 * Defines visual current phase from GameContext
 *
 */
export function CurrentPhaseController(): JSX.Element {
  const gameContext = useGameContext();

  return (
    <CurrentPhase
      phase={gameContext.phase}
      mustSkip={mustSkip(gameContext)}
      activeCard={gameContext.activeCard}
      onSkip={() => {
        gameContext.skip();
      }}
    />
  );
}
