import { tilesInRange } from "game-logic/tiles-in-range";
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
    (tile.building?.owner === card.owner && canBuildOn(tile.building));
}

function canBuildOn(building: Building) {
  return building.type !== "citadel" || !building.hasWalls;
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
      .map(entryTileId)
      .filter((tileId) => getInRangeMovements({ tileId, board }).length > 0);
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
    return [];
  }

  const { range } = pieces[piece.type];
  const tiles = reachableTiles({ from: tileId, board, piece, range });

  return tiles.filter((candidateTile) => {
    const target = board[candidateTile];

    const isEmptyOrOpponentTile =
      !target.piece || target.piece.owner !== piece.owner;

    return isAllowedTerrain({ tile: target, piece }) && isEmptyOrOpponentTile;
  });
}

// annotated: recursive
function reachableTiles({
  from,
  board,
  piece,
  range,
}: {
  from: TileID;
  board: Board;
  piece: Piece;
  range: number;
}): TileID[] {
  const neighbours = tilesInRange({ tileId: from, range: 1 });
  if (range === 1) {
    return neighbours;
  }
  const further = neighbours
    .filter((neighbour) => canPassThrough({ tile: board[neighbour], piece }))
    .flatMap((neighbour) =>
      reachableTiles({ from: neighbour, board, piece, range: range - 1 })
    );
  return Array.from(new Set([...neighbours, ...further])).filter(
    (t) => t !== from
  );
}

function isAllowedTerrain({ tile, piece }: { tile: Tile; piece: Piece }) {
  return (
    tile.terrain === undefined ||
    pieces[piece.type].specialTerrain.includes(tile.terrain)
  );
}

/* A knight passes through empty regions or its own troops and settlements, never forests, mountains or lakes */
function canPassThrough({ tile, piece }: { tile: Tile; piece: Piece }) {
  return (
    isAllowedTerrain({ tile, piece }) &&
    (!tile.piece || tile.piece.owner === piece.owner) &&
    (!tile.building || tile.building.owner === piece.owner)
  );
}

/** a village can't be built on terrain, nor on or next to another settlement */
function isBuildingPlot({ tileId, board }: _TileInBoard) {
  const tile = board[tileId];
  if (tile.terrain || tile.building) {
    return false;
  }
  return tilesInRange({ tileId, range: 1 }).every(
    (neighbour) => !board[neighbour]?.building
  );
}
