import { Avatar } from "./avatar/avatar";
import c from "classnames";

import styles from "./player-card.module.css";

type Props = {
  player: PlayerStatus;
  active?: boolean;
  clickable?: boolean;
  onClick: (player: PlayerStatus) => void;
};

export function PlayerSummary({ player, active, clickable, onClick }: Props) {
  return (
    <article
      className={c(
        styles.playerCard,
        styles[player.player],
        clickable && styles.clickable,
        active && styles.active
      )}
      role="button"
      aria-label={`${player.player} summary`}
      aria-disabled={!clickable}
      aria-roledescription="player summary"
      onClick={() => clickable && onClick(player)}
    >
      <div className={styles.playerPoints}>
        <Avatar player={player.player} />
        <span className={styles.points}>{player.points}p</span>
      </div>
      <div className={styles.extraPoints}></div>
    </article>
  );
}
