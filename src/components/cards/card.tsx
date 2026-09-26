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
  // a card you can play is a button; the rest is a plain article
  const Element = onClick ? "button" : "article";

  return (
    <Element
      className={c(
        className,
        styles.card,
        styles[status],
        isActionCard(card) && styles.actionCard,
        isActionCard(card) && styles[card.owner],
        isEventCard(card) && styles.eventCard
      )}
      aria-label={cardLabel(card)}
      {...(onClick && {
        type: "button" as const,
        onClick,
        "aria-pressed": status === "selected",
        "aria-disabled": status !== "available",
      })}
    >
      {card.cardType === "actionCard" && <ActionCardContents card={card} />}
      {card.cardType === "eventCard" && <EventCardContents card={card} />}
    </Element>
  );
}

function cardLabel(card: Card) {
  return isActionCard(card)
    ? `${card.owner} ${CARD_TITLE[card.action]} card`
    : `${card.event} event card`;
}

function ActionCardContents({ card: actionCard }: { card: ActionCard }) {
  const { action, owner } = actionCard;
  const cardIcon = actionCardAssets[action][owner];
  const backgroundWaterMark = actionCardAssets[action].bgWaterMark;

  // spans, not divs or <p>: a <button> may only hold phrasing content
  return (
    <>
      <span className={styles.heading}>
        <span
          className={styles.icon}
          style={{ backgroundImage: `url(${cardIcon})` }}
        ></span>
        <span className={c(styles.title, fontStyles.title)}>
          {CARD_TITLE[action]}
        </span>
      </span>
      <span className={styles.content}>
        <span className={c(styles.text, fontStyles.paragraph)}>
          {CARD_TEXT[action].map((p, idx) => (
            <span key={idx} className={styles.paragraph}>
              {p}
            </span>
          ))}
        </span>
        <span
          className={styles.waterMark}
          style={{ backgroundImage: `url(${backgroundWaterMark})` }}
        ></span>
      </span>
    </>
  );
}

function EventCardContents(_: { card: EventCard }) {
  // TODO: Alpha
  return <span></span>;
}
