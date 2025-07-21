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
    <article
      className={c(
        styles.card,
        styles[status],
        isActionCard(card) && styles.actionCard,
        isEventCard(card) && styles.eventCard
      )}
      key={card.cardId}
      aria-label={`card ${card.cardId}`}
      aria-pressed={status === "selected"}
      aria-disabled={!onClick}
      onClick={onClick}
    >
      {card.cardType === "actionCard" && <ActionCardContents card={card} />}
      {card.cardType === "eventCard" && <EventCardContents card={card} />}
    </article>
  );
}

function ActionCardContents({ card: actionCard }: { card: ActionCard }) {
  const { action, owner } = actionCard;
  const cardIcon = actionCardAssets[action][owner];
  const backgroundWaterMark = actionCardAssets[action].bgWaterMark;

  return (
    <>
      <div className={styles.heading}>
        <div
          className={styles.icon}
          style={{ backgroundImage: `url(${cardIcon})` }}
        ></div>
        <div className={c(styles.title, fontStyles.title)}>{action}</div>
      </div>
      <div className={styles.content}>
        <div className={c(styles.text, fontStyles.paragraph)}>
          {CARD_TEXT[action].map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
        <div
          className={styles.waterMark}
          style={{ backgroundImage: `url(${backgroundWaterMark})` }}
        ></div>
      </div>
    </>
  );
}

function EventCardContents({ card }: { card: EventCard }) {
  // TODO: Alpha
  return <div></div>;
}
