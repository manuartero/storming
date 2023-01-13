import { logRender } from "utils/console";
import { ActionLineItem } from "./line-item";

import "./timeline.scss";

interface Props {
  timeline: Timeline;
}

export function Timeline({ timeline }: Props): JSX.Element {
  logRender("Timeline");

  const renderLineItems = (section: Card[]) => {
    return section.map((card) => {
      if (card.cardType === "actionCard")
        return <ActionLineItem key={card.cardId} card={card} />;
    });
  };

  return (
    <div className="timeline">
      <div className="timeline__next timeline__section">
        <span className="timeline__section__name">NEXT</span>
        <div className="timeline__section__line">
          {renderLineItems(timeline.next)}
        </div>
      </div>
      <div className="timeline__future timeline__section">
        <span className="timeline__section__name">FUTURE</span>
        <div className="timeline__section__line">
          {renderLineItems(timeline.future)}
        </div>
      </div>
    </div>
  );
}
