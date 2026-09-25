import { asTileID, coordinates } from "models/tiles";

const NEIGHBOUR_TILES_MEM_CACHE: Partial<Record<TileID, TileID[]>> = {};

export function tilesInRange({
  tileId,
  range = 1,
}: {
  tileId: TileID;
  range?: number;
}) {
  return tilesInRangeRec({ tileId, range, acc: [] }).filter(
    (t) => t !== tileId
  );
}

// annotated: recursive
function tilesInRangeRec({
  tileId,
  range,
  acc,
}: {
  tileId: TileID;
  range: number;
  acc: TileID[];
}): TileID[] {
  const neighbourTiles = tilesInRange1Cached(tileId);
  if (range === 1) {
    return union({ a: acc, b: neighbourTiles });
  }
  const tiles = neighbourTiles.flatMap((neighbour) =>
    tilesInRangeRec({ tileId: neighbour, range: range - 1, acc })
  );
  return union({ a: acc, b: tiles });
}

/** both arrays, without duplicates */
function union<T>({ a, b }: { a: T[]; b: T[] }) {
  return Array.from(new Set([...a, ...b]));
}

function tilesInRange1Cached(tileId: TileID) {
  const cached = NEIGHBOUR_TILES_MEM_CACHE[tileId] ?? tilesInRange1(tileId);
  NEIGHBOUR_TILES_MEM_CACHE[tileId] = cached;
  return cached;
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
