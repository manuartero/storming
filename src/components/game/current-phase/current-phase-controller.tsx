import { useGameContext } from "contexts";
import { CurrentPhase } from "./current-phase";
import { mustSkip } from "./must-skip";
import { warnInconsistentState } from "utils/console";

export function CurrentPhaseController(): JSX.Element {
  const gameContext = useGameContext();

  if (!gameContext.phase || !gameContext.activePlayer) {
    warnInconsistentState(`<CurrentPhase />: no phase or active player found`, {
      gameContext,
    });
    return <>ERROR</>;
  }

  return (
    <CurrentPhase
      phase={gameContext.phase}
      activePlayer={gameContext.activePlayer}
      activeCard={gameContext.activeCard}
      mustSkip={mustSkip(gameContext)}
      onSkip={() => {
        gameContext.skip();
      }}
    />
  );
}
