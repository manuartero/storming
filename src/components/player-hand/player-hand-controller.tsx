import { useGameContext } from "game-context";
import { isActionCard } from "models/new-card";
import { logRender, warnInconsistentState } from "utils/console";
import { inferPlayerHandsFromGameContext } from "./infer-player-hands";
import { PlayerHand } from "./player-hand";

export function PlayerHandController() {
  logRender("PlayerHandController");
  const gameContext = useGameContext();

  if (!gameContext.activePlayer) {
    warnInconsistentState(
      "trying to render <PlayerHand /> while no activePlayer",
      { gameContext }
    );
    return <>ERROR</>;
  }

  /* infered state */
  const nextCard = gameContext.next.find(
    (timelineCard) => !timelineCard.commited && isActionCard(timelineCard.card)
  )?.card as ActionCard;
  const playerCards = inferPlayerHandsFromGameContext(gameContext);
  const activePlayerHand = playerCards[gameContext.activePlayer];

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
      return; // ignore click
    }

    if (!isActionCard(playerCard.card)) {
      // TODO; event cards
      return;
    }

    if (nextCard) {
      gameContext.plan({
        futureActionCard: playerCard.card,
      });
    } else {
      // FIXME: we may only modify future card once next card is set
      gameContext.plan({
        nextActionCard: playerCard.card,
      });
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
