import c from "classnames";
import { isActionCard } from "models/new-card";
import CARD_TEXT from "./card-text.json";

import "./card.scss";

type Props = {
  card: Card;
  status?: PlayerHandCardStatus | CardStatus;
  onClick?: () => void;
};

export function Card({ card, status = "available", onClick }: Props) {
  return (
    <div
      className={c(
        "card",
        `card--${status}`,
        isActionCard(card) ? "action-card" : "event-card",
        isActionCard(card) && `action-card--${card.owner}`,
        onClick && status === "available" && "clickable"
      )}
      key={card.cardId}
      onClick={onClick}
      aria-disabled={!onClick}
    >
      {card.cardType === "actionCard" ? (
        <ActionCardContents card={card} />
      ) : (
        <EventCardContents card={card} />
      )}
    </div>
  );
}

function ActionCardContents({ card }: { card: ActionCard }) {
  const { action, owner } = card;
  return (
    <>
      <div
        className={c(
          "action-card__icon",
          `action-card__icon--${action}-${owner}`
        )}
      ></div>
      <div className="action-card__title">{action}</div>
      <div className="action-card__text">{CARD_TEXT[action]}</div>
      <div
        className={c(
          "action-card__water-mark",
          `action-card__water-mark--${action}`
        )}
      ></div>
    </>
  );
}

function EventCardContents({ card }: { card: EventCard }) {
  // TODO: Alpha
  return <div></div>;
}
