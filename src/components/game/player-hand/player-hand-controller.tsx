import { useGameContext } from "contexts";
import { useEffect, useState } from "react";
import { warnInconsistentState } from "utils/console";
import { inferPlayerHandsFromGameContext } from "./infer-player-hands";
import { PlayerHand } from "./player-hand";

/**
 * Renders depends on:
 *  - `useGameContext()`
 *
 * Defines visual player hand from GameContext
 *
 */
function PlayerHandController(): JSX.Element {
  const gameContext = useGameContext();
  const [nextCard, setNextCard] = useState<ActionCard>();

  // FIXME can I change the approach: new player -> no selected card
  useEffect(() => {
    setNextCard(undefined);
  }, [gameContext.activePlayer]);

  /* infered state */
  const playerCards = inferPlayerHandsFromGameContext(
    gameContext.timeline,
    nextCard
  );
  const activePlayerHand = gameContext.activePlayer
    ? playerCards[gameContext.activePlayer]
    : [];

  const handlePlayerCardClick = (cardId: CardId) => {
    if (!gameContext.activePlayer) {
      return warnInconsistentState(
        `trying to handle click on ${cardId} while no activePlayer`
      );
    }
    const playerCard = activePlayerHand.find((e) => e.card.cardId === cardId);
    if (!playerCard) {
      return warnInconsistentState(
        `trying to handle click on ${cardId}, can't find this card on player's hand`,
        { activePlayerHand }
      );
    }

    if (playerCard.status !== "available") {
      return;
    }

    if (nextCard) {
      gameContext.plan({
        nextCard,
        futureCard: playerCard.card as ActionCard, // casting? XXX
        player: gameContext.activePlayer,
      });
    } else {
      setNextCard(playerCard.card as ActionCard); // casting? XXX
    }
  };

  return (
    <PlayerHand
      isActive={gameContext.phase === "planification"}
      player={gameContext.activePlayer}
      cards={activePlayerHand}
      onClick={handlePlayerCardClick}
    />
  );
}

export default PlayerHandController;
