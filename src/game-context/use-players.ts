import { useState } from "react";

export const initialPlayerStatus: PlayerStatus[] = [
  { player: "player", points: 0, greatestEmpirePoint: false },
  { player: "enemy1", points: 0, greatestEmpirePoint: false },
  { player: "enemy2", points: 0, greatestEmpirePoint: false },
  { player: "enemy3", points: 0, greatestEmpirePoint: false },
];

/* the transitions behind the setters, so the provider can preview them */

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

/**
 * plain react state + named update methods
 *
 * **no game logic here**
 */
export function usePlayers() {
  const [players, setPlayers] = useState(initialPlayerStatus);

  const reorderPlayers = (
    reorder: (currentPlayers: PlayerStatus[]) => PlayerStatus[]
  ) => {
    setPlayers(reorder);
  };

  const scorePoint = (player: PlayerType) => {
    setPlayers((currentPlayers) =>
      withPoint({ players: currentPlayers, player })
    );
  };

  const declareGreatestEmpire = (player: PlayerType) => {
    setPlayers((currentPlayers) =>
      withGreatestEmpire({ players: currentPlayers, player })
    );
  };

  return {
    players,
    reorderPlayers,
    scorePoint,
    declareGreatestEmpire,
    _overridePlayers: setPlayers,
  };
}
