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

export function isCreatingGreatesEmpire({
  building,
  empires,
}: {
  building: Building;
  empires: Record<PlayerType, number>;
}) {
  const player = building.owner;
  const newEmpireSize = empires[player] + 1;
  if (newEmpireSize < 3) {
    return false;
  }
  const isGreatestEmpire = Object.values(empires).every(
    (size) => size < newEmpireSize
  );
  if (isGreatestEmpire) {
    console.info(`Score: ${player} is creating the greatest empire`);
    return true;
  }
  return false;
}
