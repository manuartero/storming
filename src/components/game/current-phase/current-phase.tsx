import { Button } from "components/common";
import IconCard from "components/game/cards/icon-card"; // TODO: deprecated
import { logRender } from "utils/console";
import { CardSilhouette } from "components/game/cards";
import c from "classnames";

import "./current-phase.scss";

type Props = {
  phase: PhaseType;
  activePlayer: PlayerType;
  activeCard?: Card;
  mustSkip?: boolean;
  onSkip: () => void;
};

export function CurrentPhase({
  phase,
  activePlayer,
  activeCard = undefined,
  mustSkip = false,
  onSkip,
}: Props): JSX.Element {
  logRender("CurrentPhase");

  return (
    <div className={c("current-phase", activePlayer)}>
      <h2 className="current-phase__heading">{phase}</h2>
      <div className="current-phase__content">
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
    </div>
  );
}

function ActionPhase({
  activeCard,
  mustSkip,
  onSkip,
}: Omit<Props, "phase" | "activePlayer">) {
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
