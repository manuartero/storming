import c from "classnames";
import { Card, CardSilhouette } from "components/cards";
import { Button } from "elements";

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
  nextActionCard?: ActionCard;
  futureActionCard?: ActionCard;
  event?: EventCard; // TODO Event Cards
  onSubmitPlan: () => void;
  onCleanActionCard: (actions: Actions) => void;
};

export function CurrentPhase(props: ActionPhaseProps | PlanningPhaseProps) {
  return (
    <section
      className={styles.currentPhase}
      role="region"
      aria-label="current phase"
    >
      <div className={c(styles.heading, props.activePlayer)}>
        <h1>{props.phase}</h1>
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
    <>
      <Card card={activeCard} status="active" />
      <Button disabled={!mustSkip} onClick={onSkip}>
        SKIP
      </Button>
    </>
  );
}

function PlanningPhase({
  activePlayer,
  nextActionCard,
  futureActionCard,
  onSubmitPlan,
  onCleanActionCard,
}: PlanningPhaseProps) {
  const buttonDisabled = !nextActionCard || !futureActionCard;

  return (
    <>
      {nextActionCard ? (
        <Card
          card={nextActionCard}
          onClick={() => {
            onCleanActionCard({
              nextActionCard: null,
              futureActionCard: undefined,
            });
          }}
        />
      ) : (
        <CardSilhouette card="next" />
      )}
      {futureActionCard ? (
        <Card
          card={futureActionCard}
          onClick={() => {
            onCleanActionCard({
              nextActionCard: undefined,
              futureActionCard: null,
            });
          }}
        />
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
    </>
  );
}
