import c from "classnames";
import { Piece, Tile } from "elements";

import styles from "./card.module.css";
import fontStyles from "styles/fonts.module.css";

type Props = {
  card:
    | "next"
    | "future"
    | "build-walls"
    | "upgrade-settlement"
    | "recruit-soldier"
    | "recruit-knight";
  player?: PlayerType;
  disabled?: boolean;
  onClick?: () => void;
};

export function CardSilhouette({
  card,
  player = "player",
  disabled = false,
  onClick,
}: Props) {
  const title = card.replace(/-/g, " ");

  return (
    <article
      className={c(
        styles.card,
        styles.silhouette,
        disabled && styles.disabled,
        onClick && styles.clickable
      )}
      aria-disabled={!onClick}
      aria-label={`card silhouette ${card}`}
      onClick={onClick}
    >
      <div className={styles.heading}>
        <h3 className={c(styles.title, fontStyles.title)}>{title}</h3>
      </div>
      <div className={styles.content}>
        {card === "recruit-soldier" && (
          <Tile id={null} disableChildrenOffset>
            <Piece owner={player} type="soldier" />
          </Tile>
        )}
        {card === "recruit-knight" && (
          <Tile id={null} disableChildrenOffset>
            <Piece owner={player} type="knight" />
          </Tile>
        )}
      </div>
    </article>
  );
}
