import { getAvailableTilesForActionCard } from "game-logic/available-tiles";

/**
 * {
 *   ...
 *   [tileID]: {
 *     terrain: '';
 *     piece: {};
 *     building: {};
 *     +status: "idle" | "selected" | "available" | "forbidden"
 *   }
 * }
 */
export function inferVisualBoardFromGameContext(
  { board, activeCard }: { board: Board; activeCard: Card | undefined },
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

  const tileStatus = (tileId: TileID) => {
    if (tileId === selectedTile) {
      return "selected";
    }
    return availableTiles.includes(tileId as TileID) ? "available" : "idle";
  };

  return Object.entries(board).reduce(
    (acc, [tileId, tile]) => ({
      ...acc,
      [tileId]: {
        ...tile,
        status: tileStatus(tileId as TileID),
      },
    }),
    {} as VisualBoard
  );
}
