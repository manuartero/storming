import { useGameContext } from "contexts";
import { getAvailableTilesForActionCard } from "models/available-tiles";
import Timeline from "./timeline";

function mustSkip(gameContext: GameContext) {
  if (gameContext.activeCard?.cardType === "actionCard") {
    return (
      gameContext.activeCard.action !== "diplo" &&
      getAvailableTilesForActionCard({
        board: gameContext.board,
        activeCard: gameContext.activeCard,
      }).length === 0
    );
  }
  return false;
}

/**
 * Renders depends on:
 *  - useGameContext()
 */
function TimelineController(): JSX.Element {
  const gameContext = useGameContext();

  return (
    <Timeline
      phase={gameContext.phase}
      timeline={gameContext.timeline}
      mustSkip={mustSkip(gameContext)}
      onSkip={() => {
        gameContext.skip();
      }}
    />
  );
}

export default TimelineController;
