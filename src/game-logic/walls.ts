/**
 * rules: build.wall.2 — walls stop enemy troops from entering.
 * rules: attack.5 — attacking a walled settlement destroys the wall;
 * the troop stays in the region it attacked from.
 */
export function isAttackingWalls({
  targetTile,
  player,
}: {
  targetTile: Tile;
  player: PlayerType;
}) {
  const building = targetTile.building;
  return Boolean(building?.hasWalls && building.owner !== player);
}
