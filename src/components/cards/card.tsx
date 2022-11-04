import c from "classnames";
import IconCard from "./icon-card";

import "./card.scss";

interface Props {
  status: PlayerHandCardStatus;
  card: Card;
  onClick?: () => void;
}

function Card({ status, card, onClick }: Props): JSX.Element {
  return (
    <div
      className={c(
        "card",
        status === "available" && "card--available",
        status === "selected" && "card--selected",
        onClick && "clickable"
      )}
      onClick={onClick}
    >
      <IconCard card={card} />
    </div>
  );
}

export default Card;
