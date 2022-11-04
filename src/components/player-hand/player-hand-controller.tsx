import { useGameContext } from "contexts";
import { useEffect, useState } from "react";
import PlayerHand from "./player-hand";

const players: Player[] = ["player", "enemy1", "enemy2", "enemy3"];
const actionCards: ActionCardType[] = [
  "build",
  "diplo",
  "move",
  "move",
  "recruit",
];

function getPlayedActionCards(timeline: Timeline): ActionCard[] {
  const playedCards = [...timeline.next, ...timeline.future];
  if (timeline.current) {
    playedCards.unshift(timeline.current);
  }
  return playedCards.filter(
    (playedCard) => playedCard.cardType === "actionCard"
  ) as ActionCard[];
}

function defineCardStatus(
  playedActionCards: ActionCard[],
  player: Player,
  action: ActionCardType,
  selectedCard?: ActionCard
): PlayerHandCardStatus {
  if (selectedCard && selectedCard.action === action) {
    return "selected";
  }
  const hasBeenPlayed = playedActionCards.some(
    (playedCard) => playedCard.owner === player && playedCard.action === action
  );
  return hasBeenPlayed ? "played" : "available";
}

/**
 * {
 *   "player": [ { cardType: "build", status: "available" } ]
 *   "enemy1": [ ... ]
 *   "enemy2": [ ... ]
 *   "enemy3": [ ... ]
 * }
 */
function inferPlayerHandsFromGameContext(
  timeline: Timeline,
  selectedCard?: ActionCard
): Record<Player, PlayerHand> {
  const playedActionCards = getPlayedActionCards(timeline);

  return players.reduce((acc, player) => {
    const playerHand = actionCards.map((action) => {
      const status = defineCardStatus(
        playedActionCards,
        player,
        action,
        selectedCard
      );
      return {
        action,
        status,
      };
    });

    return {
      ...acc,
      [player]: playerHand,
    };
  }, {} as Record<Player, PlayerHand>);
}

function PlayerHandController(): JSX.Element {
  const gameContext = useGameContext();
  const [nextCard, setNextCard] = useState<ActionCard | undefined>(undefined);

  // FIXME can I change the approach: new player -> no selected card
  useEffect(() => {
    setNextCard(undefined);
  }, [gameContext.activePlayer]);

  /* infered state */
  const playerHands = inferPlayerHandsFromGameContext(
    gameContext.timeline,
    nextCard
  );
  const activePlayerHand = gameContext.activePlayer
    ? playerHands[gameContext.activePlayer]
    : [];

  const onClick = (actionCard: ActionCard) => {
    if (!gameContext.activePlayer) {
      console.warn(
        `Inconsistent state: PlayerHandController trying to handle click on ${actionCard} while no activePlayer`
      );
      return;
    }
    if (nextCard) {
      gameContext.plan({
        nextCard,
        futureCard: actionCard,
        player: gameContext.activePlayer,
      });
    } else {
      setNextCard(actionCard);
    }
  };

  return (
    <PlayerHand
      isActive={gameContext.phase === "planification"}
      player={gameContext.activePlayer}
      cards={activePlayerHand}
      onClick={onClick}
    />
  );
}

export default PlayerHandController;
