import { tilesInRange } from "./tiles";

type _FilterPredicate = (_: [string, Tile]) => boolean;

function hasBuildingFromSameOwner(card: ActionCard): _FilterPredicate {
  return ([_, tile]) => tile.building?.owner === card.owner;
}

function hasPieceFromSameOwner(card: ActionCard): _FilterPredicate {
  return ([_, tile]) => tile.piece?.owner === card.owner;
}

function hasSoldierFromSameOwner(card: ActionCard): _FilterPredicate {
  return ([_, tile]) =>
    tile.piece?.owner === card.owner && tile.piece?.type === "soldier";
}

function asTileID([t, _]: [string, Tile]): TileID {
  return t as TileID;
}

export function getAvailableTilesForActionCard({
  board,
  activeCard,
  selectedTile,
  activePlayer,
}: {
  board: Board;
  activeCard: ActionCard;
  selectedTile: TileID | undefined;
  activePlayer: Player | undefined;
}): TileID[] {
  if (activeCard.action === "move") {
    if (selectedTile && board[selectedTile].piece?.owner === activePlayer) {
      return getInRangeMovements(board, selectedTile);
    }
    return Object.entries(board)
      .filter(hasPieceFromSameOwner(activeCard))
      .map(asTileID);
  }

  if (activeCard.action === "build") {
    return Object.entries(board)
      .filter(hasSoldierFromSameOwner(activeCard))
      .map(asTileID);
  }

  if (activeCard.action === "recruit") {
    return Object.entries(board)
      .filter(hasBuildingFromSameOwner(activeCard))
      .map(asTileID);
  }
  return [];
}

export function getInRangeMovements(board: Board, tile: TileID): TileID[] {
  const tiles = tilesInRange(tile);
  return tiles.filter(
    (candidateTile) =>
      /* valid options: */
      !board[candidateTile].piece ||
      board[candidateTile].piece?.owner !== board[tile].piece?.owner
  );
}
