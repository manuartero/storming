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

export function isCreatingGreatestEmpire({
  building,
  empires,
}: {
  building: Building;
  empires: Partial<Record<PlayerType, number>>;
}) {
  const player = building.owner;
  const newEmpireSize = (empires[player] ?? 0) + 1;
  if (newEmpireSize < 3) {
    return false;
  }
  const isGreatestEmpire = Object.values(empires).every(
    (size = 0) => size < newEmpireSize
  );
  if (isGreatestEmpire) {
    console.info(`Score: ${player} is creating the greatest empire`);
    return true;
  }
  return false;
}
