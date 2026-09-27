/* plain players → players updates: no validity check, no game logic */

export const withPoint = ({
  players,
  player,
}: {
  players: PlayerStatus[];
  player: PlayerType;
}) =>
  players.map((p) =>
    p.player === player ? { ...p, points: p.points + 1 } : p
  );

export const withGreatestEmpire = ({
  players,
  player,
}: {
  players: PlayerStatus[];
  player: PlayerType;
}) => players.map((p) => ({ ...p, greatestEmpirePoint: p.player === player }));
