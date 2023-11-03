import c from "classnames";
import { Dialog } from "elements";
import { CardSilhouette } from "components/cards";

import "./option-dialog.scss";

type Props = {
  onWallOption: () => void;
  onUpgradeOption: () => void;
  onClose: () => void;
};

function BuildDialog({ onWallOption, onUpgradeOption, onClose }: Props) {
  return (
    <Dialog size="small" onClose={onClose}>
      <div className="option-dialog">
        <div
          className={c("option-dialog__option", "option-dialog__option__wall")}
        >
          <CardSilhouette card="build-walls" onClick={onWallOption} />
        </div>
        <div
          className={c(
            "option-dialog__option",
            "option-dialog__option__upgrade"
          )}
        >
          <CardSilhouette card="upgrade-settlement" onClick={onUpgradeOption} />
        </div>
      </div>
    </Dialog>
  );
}

export default BuildDialog;
