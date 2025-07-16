import { tilesInRange } from "game-logic/tiles-in-range";
import { warnInconsistentState } from "utils/console";
import { pieces } from "./pieces";

type _FilterPredicate = (_: [string, Tile]) => boolean;

function hasEmptyBuildingFromSameOwner(card: ActionCard): _FilterPredicate {
  return ([_, tile]) => tile.building?.owner === card.owner && !tile.piece;
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
    (tile.building?.owner === card.owner && tile.building.type !== "castle");
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
      .filter(hasEmptyBuildingFromSameOwner(activeCard))
      .map(asTileID);
  }
  return [];
}

type _TileInBoard = { tileId: TileID; board: Board };

export function getInRangeMovements({ tileId, board }: _TileInBoard): TileID[] {
  const piece = board[tileId].piece;
  if (!piece) {
    warnInconsistentState(
      `getting range movement for piece at ${tileId}, but no piece found`,
      { tile: board[tileId] }
    );
    return [];
  }

  const { range, specialTerrain } = pieces[piece.type];

  const tiles = tilesInRange(tileId, { range });
  return tiles.filter((candidateTile) => {
    const terrain = board[candidateTile].terrain;
    return (
      terrain !== undefined &&
      specialTerrain.includes(terrain) &&
      (!board[candidateTile].piece ||
        board[candidateTile].piece?.owner !== board[tileId].piece?.owner)
    );
  });
}

export function isBuildingPlot({ tileId, board }: _TileInBoard) {
  // TODO
  return true;
}
