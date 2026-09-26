import { useState } from "react";

const initialPlayerStatus: PlayerStatus[] = [
  { player: "player", points: 0, greatestEmpirePoint: false },
  { player: "enemy1", points: 0, greatestEmpirePoint: false },
  { player: "enemy2", points: 0, greatestEmpirePoint: false },
  { player: "enemy3", points: 0, greatestEmpirePoint: false },
];

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
      currentPlayers.map((p) =>
        p.player === player ? { ...p, points: p.points + 1 } : p
      )
    );
  };

  const declareGreatestEmpire = (player: PlayerType) => {
    setPlayers((currentPlayers) =>
      currentPlayers.map((p) =>
        p.player === player
          ? { ...p, greatestEmpirePoint: true }
          : { ...p, greatestEmpirePoint: false }
      )
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
