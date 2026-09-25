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
}) {
  const playedCards = [...next, ...future];
  if (activeCard && isActionCard(activeCard)) {
    // insert timeline.current >> [X...]
    playedCards.unshift({ card: activeCard, commited: true });
  }
  return playedCards.map((playedCard) => playedCard.card).filter(isActionCard);
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
  const playedCardIds = new Set(
    getPlayedActionCards(playedCards).map((card) => card.cardId)
  );
  return Object.fromEntries(
    Object.entries(PLAYER_CARDS).map(([player, cards]) => [
      player,
      cards.map((card) => ({
        card,
        status: playedCardIds.has(card.cardId) ? "played" : "available",
      })),
    ])
  ) as Record<PlayerType, PlayerHand>; // fromEntries loses the PlayerType keys
}
