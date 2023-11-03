import { getAvailableTilesForActionCard } from "game-logic/available-tiles";

export function mustSkip({
  activeCard,
  board,
}: {
  activeCard: Card | undefined;
  board: Board;
}) {
  if (activeCard?.cardType === "actionCard") {
    return (
      activeCard.action !== "diplo" &&
      getAvailableTilesForActionCard({ board, activeCard }).length === 0
    );
  }
  return false;
}
