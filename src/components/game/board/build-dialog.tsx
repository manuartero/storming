import { Dialog } from "components/common";
import c from "classnames";

import "./build-dialog.scss";

interface Props {
  onWallOption: () => void;
  onUpgradeOption: () => void;
}

function BuildDialog({ onWallOption, onUpgradeOption }: Props): JSX.Element {
  return (
    <Dialog className="build-dialog">
      <div
        className={c("build-dialog__option", "build-dialog__option__wall")}
        onClick={onWallOption}
      />
      <div
        className={c("build-dialog__option", "build-dialog__option__upgrade")}
        onClick={onUpgradeOption}
      />
    </Dialog>
  );
}

export default BuildDialog;
