const cardIdCount = new Map<string, number>();

export function _resetCardId() {
  cardIdCount.clear();
}

export function isActionCard(card: Card): card is ActionCard {
  return card.cardType === "actionCard";
}

export function isEventCard(card: Card): card is EventCard {
  return card.cardType === "eventCard";
}

function isActionCardType(
  type: ActionCardType | EventCardType
): type is ActionCardType {
  return (
    type === "build" ||
    type === "diplo" ||
    type === "move" ||
    type === "recruit"
  );
}

function getCardId(
  type: ActionCardType | EventCardType,
  player: PlayerType
): CardId {
  const baseCardId = `${player}_${type}` as const;
  const count = cardIdCount.get(baseCardId) || 1;
  cardIdCount.set(baseCardId, count + 1);
  const cardId = `${baseCardId}_${count}` as const;
  return cardId;
}

export function NewCard(type: ActionCardType, player: PlayerType): ActionCard;

export function NewCard(type: EventCardType, player: PlayerType): EventCard;

export function NewCard(
  type: ActionCardType | EventCardType,
  player: PlayerType
): ActionCard | EventCard {
  const cardId = getCardId(type, player);
  const toString = () => `Card{ ${type} (${player}) }`;

  const card = isActionCardType(type)
    ? {
        cardType: "actionCard" as const,
        action: type,
        owner: player,
        cardId,
      }
    : {
        cardType: "eventCard" as const,
        event: type,
        playedBy: player,
        cardId,
      };

  Object.setPrototypeOf(card, { toString });
  return card;
}
