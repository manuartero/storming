import { useGameContext } from "game-context";
import { GameOver } from "./game-over";

export function GameOverController() {
  const gameContext = useGameContext();

  if (gameContext.phase !== "ended" || !gameContext.winner) {
    return null;
  }

  return (
    <GameOver winner={gameContext.winner} onNewGame={gameContext.newGame} />
  );
}
