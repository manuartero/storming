import { useState } from "react";
import { logInconsistentState } from "utils/console";

const initialPlayerStatus: PlayerStatus[] = [
  { player: "player", points: 0, greatestEmpirePoint: false },
  { player: "enemy1", points: 0, greatestEmpirePoint: false },
  { player: "enemy2", points: 0, greatestEmpirePoint: false },
  { player: "enemy3", points: 0, greatestEmpirePoint: false },
];

function usePlayers() {
  const [players, setPlayers] = useState(initialPlayerStatus);

  const firstPlayer = (player: Player) => {
    console.info(`GameContext.firstPlayer({ player: ${player} })`);
    const newFirstPlayer = players.find((p) => p.player === player);
    if (!newFirstPlayer) {
      return logInconsistentState(`trying to set first player to ${player}`);
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

  return { players, firstPlayer, scorePoint };
}

export default usePlayers;
