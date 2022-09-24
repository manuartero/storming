const tiles = [
  // 1st row
  "-2,-3",
  "-1,-3",
  "0,-3",
  "1,-3",
  "2,-3",
  // 2nd row
  "-3,-2",
  "-2,-2",
  "-1,-2",
  "0,-2",
  "1,-2",
  "2,-2",
  // 3rd row
  "-3,-1",
  "-2,-1",
  "-1,-1",
  "0,-1",
  "1,-1",
  "2,-1",
  "3,-1",
  // 4th row
  "-4,0",
  "-3,0",
  "-2,0",
  "-1,0",
  "0,0",
  "1,0",
  "2,0",
  "3,0",
  // 5th row
  "-3,1",
  "-2,1",
  "-1,1",
  "0,1",
  "1,1",
  "2,1",
  "3,1",
  // 6th row
  "-3,2",
  "-2,2",
  "-1,2",
  "0,2",
  "1,2",
  "2,2",
  // 7th row
  "-2,3",
  "-1,3",
  "0,3",
  "1,3",
  "2,3",
] as const;

export type _TileID = typeof tiles[number];

export function coordinates(str: TileID) {
  const [x, y] = str.split(",").map(Number);
  return {
    x,
    y,
    str,
  };
}

export function asTileID({ x, y }: { x: number; y: number }): TileID | null {
  const tileId = x + "," + y;
  if (tiles.includes(tileId as TileID)) {
    return tileId as TileID;
  }
  return null;
}

export function row(n: -3 | -2 | -1 | 0 | 1 | 2 | 3): TileID[] {
  return tiles.filter((id) => coordinates(id).y === n);
}

export function tilesInRange(tile: TileID, range = 1): TileID[] {
  const { x, y } = coordinates(tile);

  // TODO use range param instead of fixed array?
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
