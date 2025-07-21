import { useGameContext } from "game-context";
import { isActionCard } from "models/new-card";
import { warnInconsistentState } from "utils/console";
import { CurrentPhase } from "./current-phase";
import { mustSkip } from "./must-skip";

export function CurrentPhaseController() {
  const gameContext = useGameContext();

  if (!gameContext.activePlayer) {
    warnInconsistentState("<CurrentPhase />: no active player");
    return <>ERROR</>;
  }

  if (gameContext.phase === "setup") {
    return <div className="current-phase" />;
  }

  return (
    <CurrentPhase
      phase={gameContext.phase}
      activePlayer={gameContext.activePlayer}
      activeCard={gameContext.activeCard}
      nextActionCard={nextNotCommitedActionCard(gameContext.next)}
      futureActionCard={nextNotCommitedActionCard(gameContext.future)}
      mustSkip={mustSkip(gameContext)}
      onSkip={() => {
        gameContext.skip();
      }}
      onSubmitPlan={() => {
        gameContext.submitPlanification();
      }}
      onCleanActionCard={(actions) => {
        gameContext.plan(actions);
      }}
    />
  );
}

function nextNotCommitedActionCard(
  timelineCards: TimelineCard[]
): ActionCard | undefined {
  const card = timelineCards.find(
    (timelineCard) => !timelineCard.commited
  )?.card;
  return card && isActionCard(card) ? card : undefined;
}
