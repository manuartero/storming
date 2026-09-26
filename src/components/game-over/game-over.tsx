import { Button, Dialog } from "elements";

import styles from "./game-over.module.css";

type Props = {
  winner: PlayerType;
  onNewGame: () => void;
};

const WINNER_TEXT: Record<PlayerType, string> = {
  player: "You win!",
  enemy1: "Red wins",
  enemy2: "Blue wins",
  enemy3: "Green wins",
};

export function GameOver({ winner, onNewGame }: Props) {
  return (
    <Dialog size="small" title="Game over">
      <div className={styles.column}>
        <p className={styles.winner}>{WINNER_TEXT[winner]}</p>
        <Button player={winner} onClick={onNewGame}>
          New game
        </Button>
      </div>
    </Dialog>
  );
}
