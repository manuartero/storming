import { getAvailableTilesForActionCard } from "game-logic/available-tiles";

export function inferVisualBoardFromGameContext(
  { board, activeCard }: Pick<GameContext, "board" | "activeCard">,
  selectedTile?: TileID
): VisualBoard {
  const availableTiles =
    activeCard?.cardType === "actionCard"
      ? getAvailableTilesForActionCard({
          board,
          activeCard,
          selectedTile,
        })
      : [];

  const tileStatus = (tile: TileID) => {
    if (tile === selectedTile) {
      return "selected";
    }
    return availableTiles.includes(tile as TileID) ? "available" : "idle";
  };

  return Object.entries(board).reduce(
    (acc, [tile, tileState]) => ({
      ...acc,
      [tile]: {
        ...tileState,
        status: tileStatus(tile as TileID),
      },
    }),
    {} as VisualBoard
  );
}
