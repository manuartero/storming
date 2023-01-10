import { Dialog } from "components/common";
import c from "classnames";

import "./build-dialog.scss";
import { CardSilhouette } from "../cards";

interface Props {
  onWallOption: () => void;
  onUpgradeOption: () => void;
  onClose: () => void;
}

function BuildDialog({
  onWallOption,
  onUpgradeOption,
  onClose,
}: Props): JSX.Element {
  return (
    <Dialog size='small' onClose={onClose}>
      <div className="build-dialog">
        <div
          className={c("build-dialog__option", "build-dialog__option__wall")}
        >
          <CardSilhouette card="build-walls" onClick={onWallOption} />
        </div>
        <div
          className={c("build-dialog__option", "build-dialog__option__upgrade")}
        >
          <CardSilhouette card="upgrade-settlement" onClick={onUpgradeOption} />
        </div>
      </div>
    </Dialog>
  );
}

export default BuildDialog;
