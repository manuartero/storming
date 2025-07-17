import { useGameContext } from "game-context";
import { PlayerSummary } from "./player-summary";

import styles from "./round-summary.module.css";

export function RoundSummary() {
  const gameContext = useGameContext();

  const isResolvingDiploAction = ({ player }: PlayerStatus) => {
    return (
      gameContext.activePlayer === player &&
      gameContext.activeCard?.cardType === "actionCard" &&
      gameContext.activeCard.action === "diplo"
    );
  };

  const onPlayerSummaryClick = (playerStatus: PlayerStatus) => {
    if (isResolvingDiploAction(playerStatus)) {
      gameContext.firstPlayer(playerStatus.player);
    }
  };

  return (
    <section
      className={styles.roundSummary}
      aria-label="round summary"
      role="region"
    >
      {gameContext.players.map((playerStatus) => (
        <PlayerSummary
          key={`player-summary-${playerStatus.player}`}
          player={playerStatus}
          active={playerStatus.player === gameContext.activePlayer}
          clickable={isResolvingDiploAction(playerStatus)}
          onClick={onPlayerSummaryClick}
        />
      ))}
    </section>
  );
}
