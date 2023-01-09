import { getAvailableTilesForActionCard } from "game-logic/available-tiles";

export function mustSkip(gameContext: GameContext) {
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
