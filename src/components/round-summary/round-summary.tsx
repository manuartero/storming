import c from "classnames";
import { useGameContext } from "game-context";
import { useState } from "react";
import { PlayerCard } from "./player-card";

import styles from "./round-summary.module.css";

export function RoundSummary() {
  const gameContext = useGameContext();
  // touch screens can't hover: a tap toggles the stack open
  const [open, setOpen] = useState(false);

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
      className={c(styles.roundSummary, open && styles.open)}
      onClick={() => setOpen((isOpen) => !isOpen)}
      aria-label="round summary"
      role="region"
    >
      {gameContext.players.map((playerStatus) => (
        <PlayerCard
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
