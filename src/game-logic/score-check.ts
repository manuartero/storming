export function isConquering({
  targetTile,
  player,
}: {
  targetTile: Tile;
  player: PlayerType;
}) {
  if (targetTile.building && targetTile.building.owner !== player) {
    console.info(`Score: ${player} is conquering a settlement`);
    return true;
  }
  return false;
}

/* vp.rotating + q.rotating-vp-tie: strictly the most settlements takes the point; a tie leaves it where it is */
export function greatestEmpireHolder({
  empires,
  current,
}: {
  empires: Partial<Record<PlayerType, number>>;
  current: PlayerType | undefined;
}) {
  const sizes = Object.entries(empires) as [PlayerType, number][];
  const most = Math.max(...sizes.map(([, size]) => size));
  const leaders = sizes.filter(([, size]) => size === most);
  return leaders.length === 1 ? leaders[0][0] : current;
}
