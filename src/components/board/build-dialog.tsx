import { CardSilhouette } from "components/cards";
import { Dialog } from "elements";

import styles from "./recruit-dialog.module.css";

type Props = {
  player?: PlayerType;
  buildWalls: () => void | undefined;
  upgradeBuilding: () => void | undefined;
  close: () => void;
};

export function BuildDialog({
  player = "player",
  buildWalls,
  upgradeBuilding,
  close,
}: Props) {
  return (
    <Dialog
      size="small"
      title="Choose How to Improve your Building"
      onClose={close}
    >
      <>
        <div className={styles.column}>
          <CardSilhouette
            card="build-walls"
            player={player}
            disabled={!buildWalls}
            onClick={buildWalls}
          />
          {!buildWalls && <span>Walls are already built</span>}
        </div>
        <div className={styles.column}>
          <CardSilhouette
            card="upgrade-settlement"
            player={player}
            disabled={!upgradeBuilding}
            onClick={upgradeBuilding}
          />
          {!upgradeBuilding && <span>Building is already upgraded</span>}
        </div>
      </>
    </Dialog>
  );
}
