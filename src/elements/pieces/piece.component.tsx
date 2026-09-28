import { piecesAssets } from "./assets";

import styles from "./piece.module.css";

type Props = {
  type?: PieceType;
  owner?: PlayerType;
};

export function Piece({ type = "soldier", owner = "player" }: Props) {
  const icon = piecesAssets[type][owner];

  return (
    <div
      role="img"
      className={styles.piece}
      aria-roledescription="game piece"
      aria-label={`${owner} ${type}`}
      style={{ backgroundImage: `url(${icon})` }}
    />
  );
}
