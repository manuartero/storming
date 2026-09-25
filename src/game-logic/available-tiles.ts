import { tilesInRange } from "game-logic/tiles-in-range";
import { warnInconsistentState } from "lib/console";
import { pieces } from "./pieces";

type _FilterPredicate = (_: [string, Tile]) => boolean;

function hasEmptyBuildingFromSameOwner(card: ActionCard): _FilterPredicate {
  return ([_, tile]) => tile.building?.owner === card.owner && !tile.piece;
}

function hasPieceFromSameOwner(card: ActionCard): _FilterPredicate {
  return ([_, tile]) => tile.piece?.owner === card.owner;
}

function hasBuilderOrBuildingFromSameOwner({
  card,
  board,
}: {
  card: ActionCard;
  board: Board;
}): _FilterPredicate {
  return ([tileId, tile]) =>
    (tile.piece?.owner === card.owner &&
      tile.piece?.type === "soldier" &&
      isBuildingPlot({ tileId: tileId as TileID, board })) ||
    (tile.building?.owner === card.owner && tile.building.type !== "castle");
}

function entryTileId([tileId]: [string, Tile]) {
  return tileId as TileID;
}

export function getAvailableTilesForActionCard({
  board,
  activeCard,
  selectedTile,
}: {
  board: Board;
  activeCard: ActionCard;
  selectedTile?: TileID | undefined;
}) {
  if (activeCard.action === "move") {
    if (selectedTile && board[selectedTile].piece?.owner === activeCard.owner) {
      return getInRangeMovements({ tileId: selectedTile, board });
    }
    return Object.entries(board)
      .filter(hasPieceFromSameOwner(activeCard))
      .map(entryTileId);
  }

  if (activeCard.action === "build") {
    return Object.entries(board)
      .filter(hasBuilderOrBuildingFromSameOwner({ card: activeCard, board }))
      .map(entryTileId);
  }

  if (activeCard.action === "recruit") {
    return Object.entries(board)
      .filter(hasEmptyBuildingFromSameOwner(activeCard))
      .map(entryTileId);
  }
  return [];
}

type _TileInBoard = { tileId: TileID; board: Board };

function getInRangeMovements({ tileId, board }: _TileInBoard) {
  const piece = board[tileId].piece;
  if (!piece) {
    warnInconsistentState(
      `getting range movement for piece at ${tileId}, but no piece found`,
      { tile: board[tileId] }
    );
    return [];
  }

  const { range, specialTerrain } = pieces[piece.type];
  const tiles = tilesInRange({ tileId, range });

  return tiles.filter((candidateTile) => {
    const target = board[candidateTile];

    const isAllowedTerrain =
      target.terrain === undefined || specialTerrain.includes(target.terrain);

    const isEmptyOrOpponentTile =
      !target.piece || target.piece.owner !== piece.owner;

    return isAllowedTerrain && isEmptyOrOpponentTile;
  });
}

// TODO: a village can't be built next to another settlement, nor on terrain
function isBuildingPlot(_: _TileInBoard) {
  return true;
}
