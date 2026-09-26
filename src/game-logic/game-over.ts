const WINNING_POINTS = 7;

/* permanent points + the rotating victory point */
export function victoryPoints(status: PlayerStatus) {
  return status.points + (status.greatestEmpirePoint ? 1 : 0);
}

export function isConqueringLastSettlement({
  targetTile,
  player,
  empires,
}: {
  targetTile: Tile;
  player: PlayerType;
  empires: Record<PlayerType, number>;
}) {
  const owner = targetTile.building?.owner;
  if (owner && owner !== player && empires[owner] === 1) {
    console.info(
      `Game over: ${player} is conquering ${owner}'s last settlement`
    );
    return true;
  }
  return false;
}

/**
 * The player who ends the game, or `undefined` if it goes on.
 *
 * - conquering an opponent's last settlement wins straight away;
 * - otherwise, the first player (in turn order) with 7 victory points.
 */
export function findWinner({
  players,
  conqueror,
}: {
  players: PlayerStatus[];
  conqueror?: PlayerType;
}) {
  if (conqueror) {
    return conqueror;
  }
  // TODO #36: tie-break when several players reach 7 at the same time
  return players.find((status) => victoryPoints(status) >= WINNING_POINTS)
    ?.player;
}
