import { CardSilhouette } from "components/cards";
import { Dialog } from "elements";

type Props = {
  onSoldierOption: () => void;
  onKnightOption: () => void;
  onClose: () => void;
};

export function RecruitDialog({
  onSoldierOption,
  onKnightOption,
  onClose,
}: Props) {
  return (
    <Dialog size="small" title="Choose Which Unit to Recruit" onClose={onClose}>
      <>
        <CardSilhouette card="recruit-soldier" onClick={onSoldierOption} />
        <CardSilhouette card="recruit-knight" onClick={onKnightOption} />
      </>
    </Dialog>
  );
}
