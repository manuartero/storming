import c from "classnames";
import { isActionCard, isEventCard } from "models/new-card";
import CARD_TEXT from "./card-text.json";
import { actionCardAssets } from "./assets";

import styles from "./card.module.css";
import fontStyles from "styles/fonts.module.css";

const CARD_TITLE: Record<ActionCardType, string> = {
  build: "Build",
  move: "Move",
  recruit: "Recruit",
  diplo: "Diplomacy",
};

type Props = {
  card: Card;
  status?: PlayerHandCardStatus;
  className?: string;
  onClick?: () => void;
};

export function Card({
  card,
  status = "available",
  className,
  onClick,
}: Props) {
  return (
    <article
      className={c(
        className,
        styles.card,
        styles[status],
        isActionCard(card) && styles.actionCard,
        isActionCard(card) && styles[card.owner],
        isEventCard(card) && styles.eventCard
      )}
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
        <div className={c(styles.title, fontStyles.title)}>
          {CARD_TITLE[action]}
        </div>
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

function EventCardContents(_: { card: EventCard }) {
  // TODO: Alpha
  return <div></div>;
}
