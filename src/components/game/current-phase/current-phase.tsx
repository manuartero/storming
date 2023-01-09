import { Button } from "components/common";
import IconCard from "components/game/cards/icon-card"; // TODO: deprecated
import { logRender } from "utils/console";
import { CardSilhouette } from "components/game/cards";

import "./current-phase.scss";

interface Props {
  phase: PhaseType;
  activeCard: Card | undefined;
  mustSkip: boolean;
  onSkip: () => void;
}

export function CurrentPhase({
  phase,
  activeCard,
  mustSkip,
  onSkip,
}: Props): JSX.Element {
  logRender("CurrentPhase");

  return (
    <div className="current-phase">
      <h2 className="current-phase__heading">{phase}</h2>
      {phase === "action" ? (
        <ActionPhase
          activeCard={activeCard}
          mustSkip={mustSkip}
          onSkip={onSkip}
        />
      ) : (
        <PlanningPhase />
      )}
    </div>
  );
}

function ActionPhase({ activeCard, mustSkip, onSkip }: Omit<Props, "phase">) {
  return (
    <div className="current-phase__action">
      <IconCard card={activeCard} />
      <Button disabled={!mustSkip} onClick={onSkip}>
        SKIP
      </Button>
    </div>
  );
}

function PlanningPhase() {
  return (
    <div className="current-phase__planning">
      <CardSilhouette card="next" />
      <CardSilhouette card="future" />
      <Button disabled={true} onClick={() => {}}>
        GO
      </Button>
    </div>
  );
}
