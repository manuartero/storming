import c from "classnames";
import { Button } from "elements";
import { Card, CardSilhouette } from "components/cards";

import styles from "./current-phase.module.css";

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
  return (
    <section
      className={styles.currentPhase}
      role="region"
      aria-label="current phase"
    >
      <div className={c(styles.heading, props.activePlayer)}>
        <h2>{props.phase}</h2>
      </div>
      <div className={styles.content}>
        {props.phase === "action" && <ActionPhase {...props} />}
        {props.phase === "planification" && <PlanningPhase {...props} />}
      </div>
    </section>
  );
}

function ActionPhase({ activeCard, mustSkip, onSkip }: ActionPhaseProps) {
  if (!activeCard) {
    return <>ERROR</>;
  }

  return (
    <div className={styles.action}>
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
    <div className={styles.planification}>
      {nextAction ? <Card card={nextAction} /> : <CardSilhouette card="next" />}
      {futureAction ? (
        <Card card={futureAction} />
      ) : (
        <CardSilhouette card="future" />
      )}
      <Button
        player={activePlayer}
        disabled={buttonDisabled}
        onClick={onSubmitPlan}
      >
        GO
      </Button>
    </div>
  );
}
