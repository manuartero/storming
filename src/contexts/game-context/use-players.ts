import { useState } from "react";
import { warnInconsistentState } from "utils/console";

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
function usePlayers() {
  const [players, setPlayers] = useState(initialPlayerStatus);

  const firstPlayer = (player: Player) => {
    console.info(`GameContext.firstPlayer({ player: ${player} })`);
    const newFirstPlayer = players.find((p) => p.player === player);
    if (!newFirstPlayer) {
      return warnInconsistentState(`trying to set first player to ${player}`);
    }
    setPlayers([newFirstPlayer, ...players.filter((p) => p.player !== player)]);
  };

  const scorePoint = (player: Player) => {
    console.info(`GameContext.point({ player: ${player} })`);
    setPlayers((currentPlayers) =>
      currentPlayers.map((p) =>
        p.player === player ? { ...p, points: p.points + 1 } : p
      )
    );
  };

  const declareGreatestEmpire = (player: Player) => {
    console.info(`GameContext.declareGreatestEmpire({ player: ${player} })`);
    setPlayers((currentPlayers) =>
      currentPlayers.map((p) =>
        p.player === player
          ? { ...p, greatestEmpirePoint: true }
          : { ...p, greatestEmpirePoint: false }
      )
    );
  };

  return { players, firstPlayer, scorePoint, declareGreatestEmpire };
}

export default usePlayers;
