/**
 * Rotates the turn order so `first` is at index 0, keeping the clockwise order.
 *
 * ```
 * rotateToFirst({ players: [p, e1, e2, e3], first: "enemy2" })
 * // [e2, e3, p, e1]
 * ```
 */
export function rotateToFirst({
  players,
  first,
}: {
  players: PlayerStatus[];
  first: PlayerType;
}) {
  const index = players.findIndex(({ player }) => player === first);
  if (index === -1) {
    return players;
  }
  return [...players.slice(index), ...players.slice(0, index)];
}
