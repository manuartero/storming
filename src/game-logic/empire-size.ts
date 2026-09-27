export function empireSize({
  board,
  players,
}: {
  board: Board;
  players: PlayerStatus[];
}) {
  const empires: Partial<Record<PlayerType, number>> = Object.fromEntries(
    players.map(({ player }) => [player, 0])
  );
  for (const tile of Object.values(board)) {
    if (tile.building) {
      const owner = tile.building.owner;
      empires[owner] = (empires[owner] ?? 0) + 1;
    }
  }
  return empires;
}
