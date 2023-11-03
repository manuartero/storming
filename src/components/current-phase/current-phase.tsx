import c from "classnames";
import { Button } from "elements";
import { Card, CardSilhouette } from "components/cards";
import IconCard from "components/cards/icon-card"; // TODO: deprecated
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

export function CurrentPhase(
  props: ActionPhaseProps | PlanningPhaseProps
): JSX.Element {
  logRender("CurrentPhase");

  return (
    <div className={c("current-phase", props.activePlayer)}>
      <h2 className="current-phase__heading">{props.phase}</h2>
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
  return (
    <div className="current-phase__action">
      <IconCard card={activeCard} />
      <Button disabled={!mustSkip} onClick={onSkip}>
        SKIP
      </Button>
    </div>
  );
}

function PlanningPhase({
  nextAction,
  futureAction,
  onSubmitPlan,
}: PlanningPhaseProps) {
  return (
    <div className="current-phase__planification">
      {nextAction ? <Card card={nextAction} /> : <CardSilhouette card="next" />}
      {futureAction ? (
        <Card card={futureAction} />
      ) : (
        <CardSilhouette card="future" />
      )}
      <Button onClick={onSubmitPlan}>GO</Button>
    </div>
  );
}
