import c from "classnames";
import { Card } from "components/cards/card";

import styles from "./player-hand.module.css";

type Props = {
  cards: PlayerHand;
  isActive?: boolean;
  player?: PlayerType;
  onClick: (cardId: CardId) => void;
};

export function PlayerHand({
  cards,
  isActive = false,
  player = undefined,
  onClick,
}: Props) {
  const considerOnClickIfActive = (cardId: CardId) => {
    isActive && onClick(cardId);
  };

  return (
    <section
      role="region"
      className={c(styles.playerHand, isActive && styles.expansible)}
      aria-label="player hand"
    >
      {player &&
        cards.map(({ card, status }) => {
          return (
            <Card
              key={card.cardId}
              status={status}
              card={card}
              onClick={() => {
                considerOnClickIfActive(card.cardId);
              }}
            ></Card>
          );
        })}
    </section>
  );
}
