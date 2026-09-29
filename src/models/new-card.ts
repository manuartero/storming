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

function nextCardId<Base extends string>(base: Base) {
  const count = cardIdCount.get(base) || 1;
  cardIdCount.set(base, count + 1);
  return `${base}_${count}` as const;
}

export function NewCard(args: {
  type: ActionCardType;
  player: PlayerType;
}): ActionCard;

// `player` is who played it (none while in the deck or a hand); `target` is
// the colour a colour-aimed event names.
export function NewCard(args: {
  type: EventCardType;
  player?: PlayerType;
  target?: PlayerType;
}): EventCard;

export function NewCard({
  type,
  player,
  target,
}: {
  type: ActionCardType | EventCardType;
  player?: PlayerType;
  target?: PlayerType;
}): Card {
  if (isActionCardType(type)) {
    // the ActionCard overload requires a player
    const owner = player as PlayerType;
    return {
      cardType: "actionCard",
      action: type,
      owner,
      cardId: nextCardId(`${owner}_${type}`),
    };
  }
  return {
    cardType: "eventCard",
    event: type,
    ...(target && { target }),
    ...(player && { playedBy: player }),
    cardId: nextCardId(`event_${type}`),
  };
}
