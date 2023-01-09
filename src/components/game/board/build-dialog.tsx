import "./build-dialog.scss";
import c from "classnames";

interface Props {
  onWallOption: () => void;
  onUpgradeOption: () => void;
}

function BuildDialog({ onWallOption, onUpgradeOption }: Props): JSX.Element {
  return (
    <dialog className="build-dialog">
      <div
        className={c("build-dialog__option", "build-dialog__option__wall")}
        onClick={onWallOption}
      />
      <div
        className={c("build-dialog__option", "build-dialog__option__upgrade")}
        onClick={onUpgradeOption}
      />
    </dialog>
  );
}

export default BuildDialog;
