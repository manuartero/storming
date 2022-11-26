export function empireSize(board: Board) {
  return Object.entries(board).reduce(
    (acc, [_, tile]) => {
      if (tile.building) {
        const player = tile.building.owner;
        acc[player] = acc[player] + 1;
      }
      return acc;
    },
    {
      player: 0,
      enemy1: 0,
      enemy2: 0,
      enemy3: 0,
    }
  );
}

