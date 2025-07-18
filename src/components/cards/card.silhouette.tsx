import c from "classnames";
import CARD_TEXT from "./card-text.json";

import styles from "./card.module.css";

type Props = {
  card:
    | "next"
    | "future"
    | "build-walls"
    | "upgrade-settlement"
    | "recruit-soldier"
    | "recruit-knight";
  onClick?: () => void;
};

export function CardSilhouette({ card, onClick }: Props) {
  return (
    <div
      className={c(
        styles.card,
        styles.cardSilhouette,
        onClick && styles.clickable
      )}
      aria-disabled={!onClick}
      onClick={onClick}
    >
      <div className={styles.silhouetteTitle}>{card}</div>
      <div className={styles.silhouetteText}>{CARD_TEXT[card]}</div>
    </div>
  );
}
