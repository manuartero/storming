import { PLAYER_CARDS } from "models/player-cards";
import { isActionCard } from "models/card";

function getPlayedActionCards(timeline: Timeline): ActionCard[] {
  const playedCards = [...timeline.next, ...timeline.future];
  if (timeline.current) {
    if (isActionCard(timeline.current)) {
      // insert timeline.current >> [X...]
      playedCards.unshift({
        card: timeline.current,
        commited: true,
      });
    }
  }
  return playedCards
    .filter((playedCard) => isActionCard(playedCard.card))
    .map((playedCard) => playedCard.card as ActionCard);
}

function defineCardStatus({
  cardId,
  selectedCard,
  playedActionCards,
}: {
  playedActionCards: ActionCard[];
  cardId: CardId;
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
) {
  const playedActionCards = getPlayedActionCards(timeline);
  const players = Object.keys(PLAYER_CARDS) as PlayerType[];
  const playerHands = players.reduce((acc, player) => {
    const playerHand = PLAYER_CARDS[player].map((card) => {
      const status = defineCardStatus({
        cardId: card.cardId,
        selectedCard,
        playedActionCards,
      });
      return { card, status };
    });
    return {
      ...acc,
      [player]: playerHand,
    };
  }, {} as Record<PlayerType, PlayerHand>);
  return playerHands;
}
