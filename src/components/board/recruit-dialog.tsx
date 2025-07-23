import { CardSilhouette } from "components/cards";
import { Dialog } from "elements";

type Props = {
  recruitSoldier: () => void;
  recruitKnight?: () => void;
  close: () => void;
};

export function RecruitDialog({ recruitSoldier, recruitKnight, close }: Props) {
  return (
    <Dialog size="small" title="Choose Which Unit to Recruit" onClose={close}>
      <>
        <CardSilhouette card="recruit-soldier" onClick={recruitSoldier} />
        <CardSilhouette
          card="recruit-knight"
          disabled={!recruitKnight}
          onClick={recruitKnight}
        />
      </>
    </Dialog>
  );
}
