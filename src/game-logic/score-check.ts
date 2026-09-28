import { empireSize } from "./empire-size";

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

/* strictly the most settlements takes the point; a tie leaves it where it is */
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

/* whoever takes the point from its holder on this board, if anybody */
export function greatestEmpireTaker({
  board,
  players,
}: {
  board: Board;
  players: PlayerStatus[];
}) {
  const current = players.find(
    ({ greatestEmpirePoint }) => greatestEmpirePoint
  )?.player;
  const holder = greatestEmpireHolder({
    empires: empireSize({ board, players }),
    current,
  });
  return holder === current ? undefined : holder;
}
