import { Dialog } from "components/common";
import c from "classnames";

import "./option-dialog.scss";
import { CardSilhouette } from "../cards";

interface Props {
  onSoldierOption: () => void;
  onKnightOption: () => void;
  onClose: () => void;
}

/**
 * FIXME duplicated code from build-dialog.tsx
 */
export function RecruitDialog({
  onSoldierOption,
  onKnightOption,
  onClose,
}: Props): JSX.Element {
  return (
    <Dialog size="small" onClose={onClose}>
      <div className="build-dialog">
        <div
          className={c("build-dialog__option", "build-dialog__option__soldier")}
        >
          <CardSilhouette card="recruit-soldier" onClick={onSoldierOption} />
        </div>
        <div
          className={c("build-dialog__option", "build-dialog__option__knight")}
        >
          <CardSilhouette card="recruit-knight" onClick={onKnightOption} />
        </div>
      </div>
    </Dialog>
  );
}
