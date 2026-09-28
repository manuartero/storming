import c from "classnames";

import styles from "./timeline.module.css";

type Props = {
  card: ActionCard;
  commited: boolean;
};

export function ActionLineItem({ card, commited }: Props) {
  return (
    <div
      className={c(
        styles.lineItem,
        card.owner === "player" && styles.expansible,
        commited ? styles.committed : styles.pending
      )}
    >
      <div className={c(styles.lineItemContent, styles[card.owner])} />
    </div>
  );
}
