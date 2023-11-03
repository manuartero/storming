import { isActionCard } from "models/new-card";
import { PLAYER_CARDS } from "models/player-cards";

function getPlayedActionCards({
  activeCard,
  next,
  future,
}: {
  activeCard: Card | undefined;
  next: TimelineCard[];
  future: TimelineCard[];
}): ActionCard[] {
  const playedCards = [...next, ...future];
  if (activeCard && isActionCard(activeCard)) {
    // insert timeline.current >> [X...]
    playedCards.unshift({ card: activeCard, commited: true });
  }
  return playedCards
    .filter((playedCard) => isActionCard(playedCard.card))
    .map((playedCard) => playedCard.card as ActionCard);
}

function defineCardStatus({
  cardId,
  nextCard,
  playedActionCards,
}: {
  cardId: CardId;
  nextCard?: ActionCard;
  playedActionCards: ActionCard[];
}): PlayerHandCardStatus {
  if (nextCard && nextCard.cardId === cardId) {
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
  playedCards: {
    activeCard: Card | undefined;
    next: TimelineCard[];
    future: TimelineCard[];
  },
  nextCard?: ActionCard
) {
  const playedActionCards = getPlayedActionCards(playedCards);
  const players = Object.keys(PLAYER_CARDS) as PlayerType[];
  const playerHands = players.reduce((acc, player) => {
    const playerHand = PLAYER_CARDS[player].map((card) => {
      const status = defineCardStatus({
        nextCard,
        cardId: card.cardId,
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
