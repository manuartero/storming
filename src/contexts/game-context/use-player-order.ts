import { useState } from "react";

const initialPlayerOrder: Player[] = ["player", "enemy1", "enemy2", "enemy3"];

function usePlayerOrder() {
  const [playerOrder, setPlayerOrder] = useState(initialPlayerOrder);
  const firstPlayer = (player: Player) => {
    const newPlayerOrder = [player, ...playerOrder.filter((p) => p !== player)];
    setPlayerOrder(newPlayerOrder);
  };
  return { playerOrder, firstPlayer };
}

export default usePlayerOrder;
