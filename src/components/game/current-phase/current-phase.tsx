import { Button } from "components/common";
import IconCard from "components/game/cards/icon-card"; // TODO: deprecated
import { logRender } from "utils/console";

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
      <div className="current-phase__action">
        <IconCard card={activeCard} />
        <Button disabled={!mustSkip} onClick={onSkip}>
          SKIP
        </Button>
      </div>
    </div>
  );
}
