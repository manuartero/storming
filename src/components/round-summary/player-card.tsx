import c from "classnames";
import { asButton } from "lib/a11y";
import { Avatar } from "./avatar/avatar";

import styles from "./player-card.module.css";

type Props = {
  player: PlayerStatus;
  active?: boolean;
  clickable?: boolean;
  onClick: (player: PlayerStatus) => void;
};

export function PlayerCard({ player, active, clickable, onClick }: Props) {
  return (
    <article
      className={c(
        styles.playerCard,
        styles[player.player],
        clickable && styles.clickable,
        active && styles.active
      )}
      aria-label={`${player.player} summary`}
      aria-current={active || undefined}
      {...asButton(clickable ? () => onClick(player) : undefined)}
    >
      <Avatar player={player.player} />
      <span className={styles.points}>
        {player.points}
        <small>pts</small>
      </span>
    </article>
  );
}
