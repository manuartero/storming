import c from "classnames";

import styles from "./piece.module.css";

type Props = {
  type?: PieceType;
  owner?: PlayerType;
};

export function Piece({ type = "soldier", owner = "player" }: Props) {
  return (
    <div
      role="img"
      className={c(styles.piece, "ignore-clicks")}
      data-type={type}
      data-player={owner}
      aria-roledescription="game piece"
      aria-label={`${owner} ${type}`}
    />
  );
}
