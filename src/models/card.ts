const cardIdCount = new Map<string, number>();

export function _resetCardId() {
  cardIdCount.clear();
}

function isActionCard(
  type: ActionCardType | EventCardType
): type is ActionCardType {
  return (
    type === "build" ||
    type === "diplo" ||
    type === "move" ||
    type === "recruit"
  );
}

function getCardId(type: ActionCardType | EventCardType, player?: PlayerType) {
  const baseCardId = `${player}_${type}`;
  const count = cardIdCount.get(baseCardId) || 1;
  cardIdCount.set(baseCardId, count + 1);
  const cardId = `${baseCardId}_${count}`;
  return cardId;
}

export function Card(type: ActionCardType, player: PlayerType): ActionCard;

export function Card(type: EventCardType, player: PlayerType): EventCard;

export function Card(
  type: ActionCardType | EventCardType,
  player: PlayerType
): ActionCard | EventCard {
  const cardId = getCardId(type, player);
  const toString = () => `Card{ ${type} (${player}) }`;

  const card = isActionCard(type)
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
