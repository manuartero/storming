import c from "classnames";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
} from "framer-motion";
import { useId } from "react";
import { ActionLineItem } from "./line-item";

import styles from "./timeline.module.css";

type Props = {
  next: TimelineCard[];
  future: TimelineCard[];
};

/* a new card pops in with a bounce, a resolved one shrinks away */
const LINE_ITEM_MOTION = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: [0, 0.9, 0.9, 1, 1, 1, 1],
    scale: [0, 1.3, 0.8, 1.2, 0.9, 1.1, 1],
  },
  exit: { opacity: 0, scale: 0 },
  transition: { duration: 0.3 },
};

export function Timeline({ next, future }: Props) {
  const id = useId();
  const renderLineItems = (section: TimelineCard[]) => {
    return section.map(({ card, commited }) => {
      if (card.cardType === "actionCard")
        return (
          <motion.div
            key={card.cardId}
            role="listitem"
            aria-label={`${card.owner} card${commited ? "" : ", pending"}`}
            layout
            {...LINE_ITEM_MOTION}
          >
            <ActionLineItem card={card} commited={commited} />
          </motion.div>
        );
    });
  };

  return (
    // reducedMotion="user": no bounce with prefers-reduced-motion: reduce
    <MotionConfig reducedMotion="user">
      <section role="region" className={styles.timeline} aria-label="timeline">
        <div className={c(styles.next, styles.section)}>
          <span className={styles.sectionName} id={`${id}-next`}>
            NEXT
          </span>
          <div
            className={styles.line}
            role="list"
            aria-labelledby={`${id}-next`}
          >
            <LayoutGroup id="next-timeline">
              <AnimatePresence>{renderLineItems(next)}</AnimatePresence>
            </LayoutGroup>
          </div>
        </div>
        <div className={c(styles.future, styles.section)}>
          <span className={styles.sectionName} id={`${id}-future`}>
            FUTURE
          </span>
          <div
            className={styles.line}
            role="list"
            aria-labelledby={`${id}-future`}
          >
            <LayoutGroup id="future-timeline">
              <AnimatePresence>{renderLineItems(future)}</AnimatePresence>
            </LayoutGroup>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
