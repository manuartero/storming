import { useGameContext } from "game-context";
import { CurrentPhase } from "./current-phase";
import { mustSkip } from "./must-skip";
import { warnInconsistentState } from "utils/console";
import { isActionCard } from "models/new-card";

export function CurrentPhaseController() {
  const gameContext = useGameContext();

  if (!gameContext.activePlayer) {
    warnInconsistentState("<CurrentPhase />: no active player");
    return <>ERROR</>;
  }

  if (gameContext.phase === "setup") {
    return <div className="current-phase" />;
  }

  const nextAction = gameContext.next.find(
    (timelineCard) =>
      timelineCard.commited === false && isActionCard(timelineCard.card)
  )?.card as ActionCard;

  const futureAction = gameContext.future.find(
    (timelineCard) =>
      timelineCard.commited === false && isActionCard(timelineCard.card)
  )?.card as ActionCard;

  return (
    <CurrentPhase
      phase={gameContext.phase}
      activePlayer={gameContext.activePlayer}
      activeCard={gameContext.activeCard}
      nextAction={nextAction}
      futureAction={futureAction}
      mustSkip={mustSkip(gameContext)}
      onSkip={() => {
        gameContext.skip();
      }}
      onSubmitPlan={() => {
        gameContext.submitPlanification();
      }}
    />
  );
}
