import c from "classnames";
import { Button } from "elements";
import { Card, CardSilhouette } from "components/cards";

import { logRender } from "utils/console";

import "./current-phase.scss";

type ActionPhaseProps = {
  phase: "action";
  activePlayer: PlayerType;
  activeCard?: Card;
  mustSkip: boolean;
  onSkip: () => void;
};

type PlanningPhaseProps = {
  phase: "planification";
  activePlayer: PlayerType;
  nextAction?: ActionCard;
  futureAction?: ActionCard;
  event?: EventCard; // TODO Event Cards
  onSubmitPlan: () => void;
};

export function CurrentPhase(props: ActionPhaseProps | PlanningPhaseProps) {
  logRender("CurrentPhase");

  return (
    <div className={c("current-phase")}>
      <div className={c("current-phase__heading", props.activePlayer)}>
        <h2>{props.phase}</h2>
      </div>
      <div className="current-phase__content">
        {props.phase === "action" ? (
          <ActionPhase {...props} />
        ) : (
          <PlanningPhase {...props} />
        )}
      </div>
    </div>
  );
}

function ActionPhase({ activeCard, mustSkip, onSkip }: ActionPhaseProps) {
  if (!activeCard) {
    return <>ERROR</>;
  }

  return (
    <div className="current-phase__action">
      <Card card={activeCard} status="active" />
      <Button disabled={!mustSkip} onClick={onSkip}>
        SKIP
      </Button>
    </div>
  );
}

function PlanningPhase({
  activePlayer,
  nextAction,
  futureAction,
  onSubmitPlan,
}: PlanningPhaseProps) {
  const buttonDisabled = !nextAction || !futureAction;
  return (
    <div className="current-phase__planification">
      {nextAction ? <Card card={nextAction} /> : <CardSilhouette card="next" />}
      {futureAction ? (
        <Card card={futureAction} />
      ) : (
        <CardSilhouette card="future" />
      )}
      <Button
        className={c(activePlayer, buttonDisabled && "button--disabled")}
        onClick={onSubmitPlan}
        disabled={buttonDisabled}
      >
        GO
      </Button>
    </div>
  );
}
