import { withGreatestEmpire, withPoint } from "game-logic/players.transitions";
import { useState } from "react";

export const initialPlayerStatus: PlayerStatus[] = [
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
