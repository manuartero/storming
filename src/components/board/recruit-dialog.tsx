import { CardSilhouette } from "components/cards";
import { Dialog } from "elements";

import styles from "./recruit-dialog.module.css";

type Props = {
  player: PlayerType;
  recruitSoldier: () => void;
  recruitKnight?: () => void;
  close: () => void;
};

export function RecruitDialog({
  player,
  recruitSoldier,
  recruitKnight,
  close,
}: Props) {
  return (
    <Dialog size="small" title="Choose Which Unit to Recruit" onClose={close}>
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
          {!recruitKnight && (
            <span>Knights could be recruited if the tower is upgraded</span>
          )}
        </div>
      </>
    </Dialog>
  );
}
