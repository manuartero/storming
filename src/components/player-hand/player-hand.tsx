import c from "classnames";
import { Card } from "components/cards/card";
import { useState } from "react";

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
  // touch screens can't hover: the first tap lifts a card, the second plays it
  const [inspected, setInspected] = useState<CardId>();

  const considerOnClickIfActive = (cardId: CardId) => {
    if (!isActive) return;
    if (!canHover() && inspected !== cardId) {
      setInspected(cardId);
      return;
    }
    setInspected(undefined);
    onClick(cardId);
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
              className={c(card.cardId === inspected && styles.inspected)}
              onClick={() => {
                considerOnClickIfActive(card.cardId);
              }}
            ></Card>
          );
        })}
    </section>
  );
}

function canHover() {
  return window.matchMedia?.("(hover: hover)").matches ?? true;
}
