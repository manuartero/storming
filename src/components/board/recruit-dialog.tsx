import { CardSilhouette } from "components/cards";
import { Dialog } from "elements";

import styles from "./recruit-dialog.module.css";

type Props = {
  player?: PlayerType;
  recruitSoldier: () => void;
  recruitKnight?: () => void;
  close: () => void;
};

export function RecruitDialog({
  player = "player",
  recruitSoldier,
  recruitKnight,
  close,
}: Props) {
  return (
    <Dialog size="small" title="Choose which troop to recruit" onClose={close}>
      <>
        <CardSilhouette
          card="recruit-soldier"
          player={player}
          onClick={recruitSoldier}
        />
        <div className={styles.column}>
          <CardSilhouette
            card="recruit-knight"
            player={player}
            disabled={!recruitKnight}
            onClick={recruitKnight}
          />
          {!recruitKnight && <span>Knights need a town or a city</span>}
        </div>
      </>
    </Dialog>
  );
}
