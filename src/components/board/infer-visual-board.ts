import { getAvailableTilesForActionCard } from "game-logic/available-tiles";

/**
 * ```
 * {
 *   ...
 *   [tileID]: {
 *     terrain: '';
 *     piece: {};
 *     building: {};
 *     +status: "selected" | "available" | "forbidden"
 *   }
 * }
 * ```
 */
export function inferVisualBoardFromGameContext({
  board,
  activeCard,
  selectedTile,
}: {
  board: Board;
  activeCard: Card | undefined;
  selectedTile?: TileID;
}): VisualBoard {
  if (!activeCard) {
    return board;
  }

  const availableTiles = new Set(
    activeCard.cardType === "actionCard"
      ? getAvailableTilesForActionCard({ board, activeCard, selectedTile })
      : []
  );

  const tileStatus = (tileId: TileID) => {
    if (tileId === selectedTile) {
      return "selected";
    }
    if (availableTiles.has(tileId)) {
      return "available";
    }
    return undefined;
  };

  return Object.fromEntries(
    Object.entries(board).map(([tileId, tile]) => [
      tileId,
      { ...tile, status: tileStatus(tileId as TileID) },
    ])
  ) as VisualBoard; // fromEntries loses the TileID keys
}
