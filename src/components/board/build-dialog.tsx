import { CardSilhouette } from "components/cards";
import { Dialog } from "elements";

type Props = {
  onWallOption: () => void;
  onUpgradeOption: () => void;
  onClose: () => void;
};

function BuildDialog({ onWallOption, onUpgradeOption, onClose }: Props) {
  return (
    <Dialog size="small" title="Choose How to Improve your Building" onClose={onClose}>
      <div className="option-dialog">
        <CardSilhouette card="build-walls" onClick={onWallOption} />

        <CardSilhouette card="upgrade-settlement" onClick={onUpgradeOption} />
      </div>
    </Dialog>
  );
}

export default BuildDialog;
