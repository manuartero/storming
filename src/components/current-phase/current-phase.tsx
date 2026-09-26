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

const PHASE_TITLE = {
  planification: "Planning",
  action: "Action",
};

export function CurrentPhase(props: ActionPhaseProps | PlanningPhaseProps) {
  return (
    <section
      className={styles.currentPhase}
      role="region"
      aria-label="current phase"
    >
      <div className={styles.heading}>
        <span
          className={c(styles.turn, styles[props.activePlayer])}
          role="img"
          aria-label={`${props.activePlayer}'s turn`}
        />
        <h1>{PHASE_TITLE[props.phase]}</h1>
      </div>
      <div
        className={c(styles.content, props.phase === "action" && styles.single)}
      >
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
      <Button
        className={styles.phaseButton}
        disabled={!mustSkip}
        onClick={onSkip}
      >
        Skip
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
        className={styles.phaseButton}
        player={activePlayer}
        disabled={buttonDisabled}
        onClick={onSubmitPlan}
      >
        Confirm plan
      </Button>
    </>
  );
}
