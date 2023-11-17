import c from "classnames";
import CARD_TEXT from "./card-text.json";

import "./card.scss";

function ActionCard({ card }: { card: ActionCard }): JSX.Element {
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

function EventCard({ card }: { card: EventCard }): JSX.Element {
  // TODO: Alpha
  return <div></div>;
}

type Props = {
  card: Card;
  status?: PlayerHandCardStatus;
  onClick?: () => void;
};

export function Card({
  card,
  status = "available",
  onClick,
}: Props): JSX.Element {
  return (
    <div
      className={c(
        "card",
        status === "played" && "card--played",
        status === "selected" && "card--selected",
        onClick && status === "available" && "clickable"
      )}
      key={card.cardId}
      onClick={onClick}
      aria-disabled={!onClick}
    >
      {card.cardType === "actionCard" ? (
        <ActionCard card={card} />
      ) : (
        <EventCard card={card} />
      )}
    </div>
  );
}
