import { asTileID, coordinates } from "models/tiles";

export function getAvailableMovements(tile: TileID, range = 1) {
  console.debug(`getAvailableMovements(${tile})`);
  const { x, y } = coordinates(tile);

  // TODO use range param instead of fixed array
  // TODO avoid fixed arrays?
  const range1Movements =
    y % 2 === 0
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
    const tileIdStr = asTileID({
      x: x + variance[0],
      y: y + variance[1],
    });
    return tileIdStr ? [tileIdStr] : [];
  });
}
