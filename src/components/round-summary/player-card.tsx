import c from "classnames";
import { Avatar } from "./avatar/avatar";

import styles from "./player-card.module.css";

type Props = {
  player: PlayerStatus;
  active?: boolean;
  clickable?: boolean;
  onClick: (player: PlayerStatus) => void;
};

export function PlayerCard({ player, active, clickable, onClick }: Props) {
  // a button only while Diplomacy lets the active player pick who goes first
  const Element = clickable ? "button" : "article";

  return (
    <Element
      className={c(
        styles.playerCard,
        styles[player.player],
        clickable && styles.clickable,
        active && styles.active
      )}
      aria-label={`${player.player} summary`}
      aria-current={active || undefined}
      {...(clickable && {
        type: "button" as const,
        onClick: () => onClick(player),
      })}
    >
      <Avatar player={player.player} />
      <span className={styles.points}>
        {player.points}
        <small>pts</small>
      </span>
    </Element>
  );
}
