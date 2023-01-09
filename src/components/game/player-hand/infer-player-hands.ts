const players: Player[] = ["player", "enemy1", "enemy2", "enemy3"];
const actionCardIds = [
  "build_A",
  "move_A",
  "move_B",
  "recruit_A",
  "diplo_A",
] as const;

function getActionCardType(actionId: string): ActionCardType {
  return actionId.split("_")[0] as ActionCardType;
}

function getPlayedActionCards(timeline: Timeline): ActionCard[] {
  const playedCards = [...timeline.next, ...timeline.future];
  if (timeline.current) {
    playedCards.unshift(timeline.current); // insert timeline.current >> [X...]
  }
  return playedCards.filter(
    (playedCard) => playedCard.cardType === "actionCard"
  ) as ActionCard[];
}

function defineCardStatus({
  cardId,
  selectedCard,
  playedActionCards,
}: {
  playedActionCards: ActionCard[];
  cardId: string;
  selectedCard?: ActionCard;
}): PlayerHandCardStatus {
  if (selectedCard && selectedCard.cardId === cardId) {
    return "selected";
  }
  const hasBeenPlayed = playedActionCards.some(
    (playedCard) => playedCard.cardId === cardId
  );
  return hasBeenPlayed ? "played" : "available";
}

/**
 * {
 *   "player": [ { card, status }, { card, status }, { card, status }... ]
 *   "enemy1": [ ... ]
 *   "enemy2": [ ... ]
 *   "enemy3": [ ... ]
 * }
 */
export function inferPlayerHandsFromGameContext(
  timeline: Timeline,
  selectedCard?: ActionCard
): Record<Player, PlayerHand> {
  const playedActionCards = getPlayedActionCards(timeline);

  return players.reduce((acc, player) => {
    const playerHand: PlayerHand = actionCardIds.map((actionId) => {
      const cardId = `${player}_${actionId}`;
      const card: ActionCard = {
        cardType: "actionCard",
        action: getActionCardType(actionId),
        cardId,
        owner: player,
      };
      const status = defineCardStatus({
        cardId,
        selectedCard,
        playedActionCards,
      });
      return { card, status };
    });

    return {
      ...acc,
      [player]: playerHand,
    };
  }, {} as Record<Player, PlayerHand>);
}
