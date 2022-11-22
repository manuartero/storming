import { tilesInRange } from "models/tiles";

type _FilterPredicate = (_: [string, Tile]) => boolean;

function hasBuildingFromSameOwner(card: ActionCard): _FilterPredicate {
  return ([_, tile]) => tile.building?.owner === card.owner;
}

function hasPieceFromSameOwner(card: ActionCard): _FilterPredicate {
  return ([_, tile]) => tile.piece?.owner === card.owner;
}

function hasBuilderOrBuildingFromSameOwner(
  card: ActionCard,
  board: Board
): _FilterPredicate {
  return ([tileId, tile]) =>
    (tile.piece?.owner === card.owner &&
      tile.piece?.type === "soldier" &&
      isBuildingPlot({ tileId: tileId as TileID, board })) ||
    (tile.building?.owner === card.owner && tile.building.type !== "city");
}

function asTileID([t, _]: [string, Tile]): TileID {
  return t as TileID;
}

export function getAvailableTilesForActionCard({
  board,
  activeCard,
  selectedTile,
}: {
  board: Board;
  activeCard: ActionCard;
  selectedTile?: TileID | undefined;
}): TileID[] {
  if (activeCard.action === "move") {
    if (selectedTile && board[selectedTile].piece?.owner === activeCard.owner) {
      return getInRangeMovements({ tileId: selectedTile, board });
    }
    return Object.entries(board)
      .filter(hasPieceFromSameOwner(activeCard))
      .map(asTileID);
  }

  if (activeCard.action === "build") {
    return Object.entries(board)
      .filter(hasBuilderOrBuildingFromSameOwner(activeCard, board))
      .map(asTileID);
  }

  if (activeCard.action === "recruit") {
    return Object.entries(board)
      .filter(hasBuildingFromSameOwner(activeCard))
      .map(asTileID);
  }
  return [];
}

type _TileInBoard = { tileId: TileID; board: Board };

export function getInRangeMovements({ tileId, board }: _TileInBoard): TileID[] {
  const tiles = tilesInRange(tileId);
  return tiles.filter(
    (candidateTile) =>
      /* valid options: */
      !board[candidateTile].piece ||
      board[candidateTile].piece?.owner !== board[tileId].piece?.owner
  );
}

export function isBuildingPlot({ tileId, board }: _TileInBoard) {
  // TODO
  return true;
}
