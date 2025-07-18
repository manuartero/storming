import c from "classnames";
import { isActionCard, isEventCard } from "models/new-card";
import CARD_TEXT from "./card-text.json";
import { actionCardAssets } from "./assets";

import styles from "./card.module.css";
import fontStyles from "styles/fonts.module.css";

type Props = {
  card: Card;
  status?: PlayerHandCardStatus | CardStatus;
  onClick?: () => void;
};

export function Card({ card, status = "available", onClick }: Props) {
  return (
    <div
      className={c(
        styles.card,
        styles[status],
        isActionCard(card) && styles.actionCard,
        isEventCard(card) && styles.eventCard,
        onClick && status === "available" && styles.clickable
      )}
      key={card.cardId}
      aria-label={`card ${card.cardId}`}
      aria-pressed={status === "selected"}
      aria-disabled={!onClick}
      onClick={onClick}
    >
      {card.cardType === "actionCard" && <ActionCardContents card={card} />}
      {card.cardType === "eventCard" && <EventCardContents card={card} />}
    </div>
  );
}

function ActionCardContents({ card: actionCard }: { card: ActionCard }) {
  const { action, owner } = actionCard;
  const cardIcon = actionCardAssets[action][owner];
  const backgroundWaterMark = actionCardAssets[action].bgWaterMark;

  return (
    <>
      <div
        className={styles.actionCardIcon}
        style={{ backgroundImage: `url(${cardIcon})` }}
      ></div>
      <div className={c(styles.actionCardTitle, fontStyles.title)}>
        {action}
      </div>
      <div className={c(styles.actionCardText, fontStyles.paragraph)}>
        {CARD_TEXT[action]}
      </div>
      <div
        className={styles.actionCardWaterMark}
        style={{ backgroundImage: `url(${backgroundWaterMark})` }}
      ></div>
    </>
  );
}

function EventCardContents({ card }: { card: EventCard }) {
  // TODO: Alpha
  return <div></div>;
}
