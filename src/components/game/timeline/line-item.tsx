import c from "classnames";

import "./line-item.scss";

interface ActionLineItem {
  card: ActionCard;
}

export function ActionLineItem({ card }: ActionLineItem): JSX.Element {
  return (
    <div className={c("line-item", card.owner === "player" && "expansible")}>
      <div
        className={c("line-item__content", `line-item__content--${card.owner}`)}
      />
    </div>
  );
}
