import { logRender } from "utils/console";
import { ActionLineItem } from "./line-item";

import "./timeline.scss";

type Props = {
  next: TimelineCard[];
  future: TimelineCard[];
};

export function Timeline({ next, future }: Props): JSX.Element {
  logRender("Timeline");

  const renderLineItems = (section: TimelineCard[]) => {
    return section.map(({ card, commited }) => {
      if (card.cardType === "actionCard")
        return (
          <ActionLineItem key={card.cardId} card={card} commited={commited} />
        );
    });
  };

  return (
    <div className="timeline">
      <div className="timeline__next timeline__section">
        <span className="timeline__section__name">NEXT</span>
        <div className="timeline__section__line">
          {renderLineItems(next)}
        </div>
      </div>
      <div className="timeline__future timeline__section">
        <span className="timeline__section__name">FUTURE</span>
        <div className="timeline__section__line">
          {renderLineItems(future)}
        </div>
      </div>
    </div>
  );
}
