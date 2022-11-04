import c from "classnames";
import IconCard from "./icon-card";

import './card.scss'

interface Props {
  available: boolean;
  card: Card;
  onClick?: () => void;
}

function Card({ available, card, onClick }: Props): JSX.Element {
  return (
    <div
      className={c("card", available && "card--available", onClick && "clickable")}
      onClick={onClick}
    >
      <IconCard card={card} />
    </div>
  );
}

export default Card;
