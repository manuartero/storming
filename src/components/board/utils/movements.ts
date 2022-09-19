import { asTileID, asTileIdStr } from "../utils/tile-model";

export function getAvailableMovements(t: TileIdStr, range = 1) {
  console.debug(`getAvailableMovements(${t})`);
  const tileID = asTileID(t);

  // TODO use range param instead of fixed array
  // TODO avoid fixed arrays?
  const range1Movements =
    tileID.y % 2 === 0
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

  return range1Movements.flatMap((variance) => {
    const tileIdStr = asTileIdStr({
      x: tileID.x + variance[0],
      y: tileID.y + variance[1],
    });
    return tileIdStr ? [tileIdStr] : [];
  });
}
