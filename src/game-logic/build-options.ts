import { NewBuilding, upgradeBuilding } from "models/new-building";

export type BuildOption = {
  kind: "settle" | "upgrade" | "walls";
  building: Building;
};

/* what a build on `tile` can produce: none, one (built straight away) or a choice */
export function buildOptions({ board, tile }: { board: Board; tile: TileID }) {
  const { building, piece } = board[tile];
  const options: BuildOption[] = [];
  if (!building) {
    if (piece?.type === "soldier") {
      options.push({
        kind: "settle",
        building: NewBuilding({ owner: piece.owner }),
      });
    }
    return options;
  }
  if (!building.hasWalls) {
    options.push({ kind: "walls", building: { ...building, hasWalls: true } });
  }
  if (building.type !== "citadel") {
    options.push({ kind: "upgrade", building: upgradeBuilding(building) });
  }
  return options;
}

/* the recruited piece belongs to the building's owner */
export function recruitOptions({
  board,
  tile,
}: {
  board: Board;
  tile: TileID;
}) {
  const { building, piece } = board[tile];
  if (!building || piece) {
    return [];
  }
  const { owner } = building;
  const pieces: Piece[] = [{ type: "soldier", owner }];
  if (building.type !== "tower") {
    pieces.push({ type: "knight", owner });
  }
  return pieces;
}
