import { logRender } from "utils/console";
import { ActionLineItem } from "./line-item";
import { motion } from "framer-motion";

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
          <motion.div
            key={card.cardId}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.9, 0.9, 1, 1, 1, 1],
              scale: [0, 1.3, 0.8, 1.2, 0.9, 1.1, 1],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ActionLineItem card={card} commited={commited} />
          </motion.div>
        );
    });
  };

  return (
    <div className="timeline">
      <div className="timeline__next timeline__section">
        <span className="timeline__section__name">NEXT</span>
        <div className="timeline__section__line">{renderLineItems(next)}</div>
      </div>
      <div className="timeline__future timeline__section">
        <span className="timeline__section__name">FUTURE</span>
        <div className="timeline__section__line">{renderLineItems(future)}</div>
      </div>
    </div>
  );
}
