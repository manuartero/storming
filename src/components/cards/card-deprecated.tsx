import c from "classnames";
import cardText from "./card-text.json";

import "./card-deprecated.scss";

interface Props {
  action: ActionCardType;
}

function Card({ action }: Props): JSX.Element {
  return (
    <div className={c("card", `card--${action}`)}>
      <div className="card__text-box">
        <div className="card__text-box__text">{cardText[action]}</div>
      </div>

      <div className="card__background">
        <div className="card__background__corner" />
        <div className="card__background__corner" />
        <div className="card__background__corner" />
        <div className="card__background__corner" />
      </div>

      <div className="card__text-box">
        <div className="card__text-box__title">{action}</div>
      </div>
    </div>
  );
}

export default Card;
