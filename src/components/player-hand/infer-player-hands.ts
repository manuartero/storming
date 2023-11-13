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

/**
 * {
 *   "player": [ { card, status }, { card, status }, { card, status }... ]
 *   "enemy1": [ ... ]
 *   "enemy2": [ ... ]
 *   "enemy3": [ ... ]
 * }
 */
export function inferPlayerHandsFromGameContext(playedCards: {
  activeCard: Card | undefined;
  next: TimelineCard[];
  future: TimelineCard[];
}) {
  const playedActionCards = getPlayedActionCards(playedCards);
  const players = Object.keys(PLAYER_CARDS) as PlayerType[];
  const playerHands = players.reduce((acc, player) => {
    const playerHand = PLAYER_CARDS[player].map((card) => {
      const status = playedActionCards.some(
        (playedCard) => playedCard.cardId === card.cardId
      )
        ? "played"
        : "available";
      return { card, status };
    });
    return {
      ...acc,
      [player]: playerHand,
    };
  }, {} as Record<PlayerType, PlayerHand>);
  return playerHands;
}
