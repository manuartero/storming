import c from "classnames";
import { avatarAssets } from "./assets";

import styles from "./avatar.module.css";

type Props = {
  player?: PlayerType;
};

export function Avatar({ player = "player" }: Props) {
  const icon = avatarAssets[player];

  return (
    <div
      role="img"
      className={c(styles.avatar, styles[player])}
      aria-roledescription="game avatar"
      aria-label={`${player} avatar`}
      style={{ backgroundImage: `url(${icon})` }}
    />
  );
}
