import { CardSilhouette } from "components/cards";
import { Dialog } from "elements";

type Props = {
  onWallOption: () => void;
  onUpgradeOption: () => void;
  onClose: () => void;
};

export function BuildDialog({ onWallOption, onUpgradeOption, onClose }: Props) {
  return (
    <Dialog
      size="small"
      title="Choose How to Improve your Building"
      onClose={onClose}
    >
      <>
        <CardSilhouette card="build-walls" onClick={onWallOption} />
        <CardSilhouette card="upgrade-settlement" onClick={onUpgradeOption} />
      </>
    </Dialog>
  );
}
