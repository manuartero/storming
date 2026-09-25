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

function getCardId({
  type,
  player,
}: {
  type: ActionCardType | EventCardType;
  player: PlayerType;
}) {
  const baseCardId = `${player}_${type}` as const;
  const count = cardIdCount.get(baseCardId) || 1;
  cardIdCount.set(baseCardId, count + 1);
  return `${baseCardId}_${count}` as const;
}

export function NewCard(args: {
  type: ActionCardType;
  player: PlayerType;
}): ActionCard;

export function NewCard(args: {
  type: EventCardType;
  player: PlayerType;
}): EventCard;

export function NewCard({
  type,
  player,
}: {
  type: ActionCardType | EventCardType;
  player: PlayerType;
}) {
  const cardId = getCardId({ type, player });

  return isActionCardType(type)
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
}
