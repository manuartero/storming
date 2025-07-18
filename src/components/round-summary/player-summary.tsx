import c from "classnames";

import styles from "./player-summary.module.css";

type Props = {
  player: PlayerStatus;
  active?: boolean;
  clickable?: boolean;
  onClick: (player: PlayerStatus) => void;
};

export function PlayerSummary({ player, active, clickable, onClick }: Props) {
  return (
    <div
      onClick={() => clickable && onClick(player)}
      className={c(
        styles.playerSummary,
        clickable && styles.clickable,
        active && styles.active
      )}
    >
      <div className={styles.playerSummaryInfo}>
        <div className={c(styles.avatar)} />
        <div className={styles.points}>{player.points}</div>
      </div>
      <div className={styles.extra}>
        <div className={styles.greatestEmpire}>
          {player.greatestEmpirePoint ? "GREATEST EMPIRE" : ""}
        </div>
      </div>
    </div>
  );
}
