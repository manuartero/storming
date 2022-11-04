import c from "classnames";
import IconCard from "components/cards/icon-card";
import { logRender } from "utils/console";

import "./timeline.scss";

interface Props {
  state: Timeline;
  // tmp
  onClick: () => void;
}

function Timeline({ state, onClick }: Props): JSX.Element {
  logRender("Timeline");
  return (
    <div className="timeline">
      <div className="timeline__current" onClick={onClick}>
        <IconCard card={state.current} />
      </div>
      <div className="timeline__next timeline__section">
        <span className="timeline__section__name">NEXT</span>
        <div className="timeline__section__line">
          {state.next.map((card, i) => (
            <LineItem key={`timeline-next-item-${i}`} card={card} />
          ))}
        </div>
      </div>
      <div className="timeline__future timeline__section">
        <span className="timeline__section__name">FUTURE</span>
        <div className="timeline__section__line">
          {state.future.map((card, i) => (
            <LineItem key={`timeline-future-item-${i}`} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface LineItemProps {
  card: Card;
}

function LineItem({ card }: LineItemProps): JSX.Element {
  // TODO on hover: show item
  const wasPlayedByTheUser =
    card.cardType === "actionCard" && card.owner === "player";

  return (
    <>
      <span
        className={c(
          "line-item",
          card.cardType === "actionCard" && `line-item--${card.owner}`
        )}
      />
      {wasPlayedByTheUser && <div className="line-item__detail"></div>}
    </>
  );
}

export default Timeline;
