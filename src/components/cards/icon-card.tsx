import c from "classnames";

import "./icon-card.scss";

interface IconCardProps {
  card: Card | undefined;
}

function IconCard({ card }: IconCardProps): JSX.Element {
  if (card?.cardType === "actionCard") {
    return ActionIconCard({ card });
  }
  return (
    <div className="icon-card">
      <div className={"icon-card__image"}></div>
      <div className="icon-card__text"></div>
    </div>
  );
}

interface ActionIconCardProps {
  card: ActionCard;
}

function ActionIconCard({ card }: ActionIconCardProps) {
  return (
    <div className={c("icon-card", `icon-card--${card.owner}`)}>
      <div
        className={c("icon-card__image", `icon-card__image--${card.action}`)}
      ></div>
      <span className="icon-card__text">{card.action}</span>
    </div>
  );
}

export default IconCard;
