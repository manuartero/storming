import { asTileID, coordinates } from "./tiles";
import { merge } from "utils/array";

const NEIGHBOUR_TILES_MEM_CACHE = {} as Record<TileID, TileID[]>;

export function tilesInRange(
  tileId: TileID,
  { range }: { range?: number } = {}
) {
  return tilesInRangeRec(tileId, range || 1, []).filter((t) => t !== tileId);
}

function tilesInRangeRec(
  tileId: TileID,
  range: number,
  acc: TileID[]
): TileID[] {
  const neighbourTiles = tilesInRange1Cached(tileId);
  if (range === 1) {
    return merge(acc, neighbourTiles);
  }
  const tiles = neighbourTiles.flatMap((tileId) =>
    tilesInRangeRec(tileId, range - 1, acc)
  );
  return merge(acc, tiles);
}

function tilesInRange1Cached(tileId: TileID) {
  if (!NEIGHBOUR_TILES_MEM_CACHE[tileId]) {
    NEIGHBOUR_TILES_MEM_CACHE[tileId] = tilesInRange1(tileId);
  }
  return NEIGHBOUR_TILES_MEM_CACHE[tileId];
}

function tilesInRange1(tileId: TileID) {
  const { x, y } = coordinates(tileId);

  return range1Variance(y).flatMap((variance) => {
    const tileIdStr = asTileID({
      x: x + variance[0],
      y: y + variance[1],
    });
    return tileIdStr ? [tileIdStr] : [];
  });
}

function range1Variance(y: number) {
  return y % 2 === 0
    ? [
        [0, -1],
        [+1, -1],
        [-1, 0],
        [+1, 0],
        [0, +1],
        [+1, +1],
      ]
    : [
        [-1, -1],
        [0, -1],
        [-1, 0],
        [+1, 0],
        [-1, +1],
        [0, +1],
      ];
}
