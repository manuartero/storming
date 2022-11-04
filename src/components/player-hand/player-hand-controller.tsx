import { useGameContext } from "contexts";
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

/**
 * {
 *   "player": [ { cardType: "build", available: true } ]
 *   "enemy1": [ ... ]
 *   "enemy2": [ ... ]
 *   "enemy3": [ ... ]
 * }
 */
function inferPlayerHandsFromGameContext(
  timeline: Timeline
): Record<Player, PlayerHand> {
  const playedActionCards = getPlayedActionCards(timeline);

  return players.reduce((acc, player) => {
    const playerHand = actionCards.map((action) => {
      return {
        action,
        available: !playedActionCards.some(
          (playedCard) =>
            playedCard.owner === player && playedCard.action === action
        ),
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
  const playerHands = inferPlayerHandsFromGameContext(gameContext.timeline);
  const activePlayerHand = gameContext.activePlayer
    ? playerHands[gameContext.activePlayer]
    : [];
  const onClick = (actionCard: ActionCard) => {
    gameContext.planNextCard(actionCard);
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
