/* plain board → board updates: no validity check, no game logic */

export function withBuilding({
  board,
  tile,
  building,
}: {
  board: Board;
  tile: TileID;
  building: Building;
}) {
  return {
    ...board,
    [tile]: { ...board[tile], building },
  };
}

/* a piece moving onto a building takes it over */
export function withMove({
  board,
  piece,
  from,
  to,
}: {
  board: Board;
  piece: Piece;
  from: TileID;
  to: TileID;
}) {
  const targetTile: Tile = { ...board[to], piece };
  if (targetTile.building) {
    targetTile.building = { ...targetTile.building, owner: piece.owner };
  }
  return {
    ...board,
    [from]: { ...board[from], piece: undefined },
    [to]: targetTile,
  };
}

export function withoutWalls({ board, tile }: { board: Board; tile: TileID }) {
  const building = board[tile].building;
  if (!building) {
    return board;
  }
  return {
    ...board,
    [tile]: { ...board[tile], building: { ...building, hasWalls: false } },
  };
}

export function withRecruit({
  board,
  tile,
  piece,
}: {
  board: Board;
  tile: TileID;
  piece: Piece;
}) {
  return {
    ...board,
    [tile]: { ...board[tile], piece },
  };
}
