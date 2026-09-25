import c from "classnames";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
} from "framer-motion";
import { ActionLineItem } from "./line-item";

import styles from "./timeline.module.css";

type Props = {
  next: TimelineCard[];
  future: TimelineCard[];
};

export function Timeline({ next, future }: Props) {
  const renderLineItems = (section: TimelineCard[]) => {
    return section.map(({ card, commited }) => {
      if (card.cardType === "actionCard")
        return (
          <motion.div
            key={card.cardId}
            layout
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
    // reducedMotion="user": no bounce with prefers-reduced-motion: reduce
    <MotionConfig reducedMotion="user">
      <section role="region" className={styles.timeline} aria-label="timeline">
        <div className={c(styles.next, styles.section)}>
          <span className={styles.sectionName}>NEXT</span>
          <div className={styles.line}>
            <LayoutGroup id="next-timeline">
              <AnimatePresence>{renderLineItems(next)}</AnimatePresence>
            </LayoutGroup>
          </div>
        </div>
        <div className={c(styles.future, styles.section)}>
          <span className={styles.sectionName}>FUTURE</span>
          <div className={styles.line}>
            <LayoutGroup id="future-timeline">
              <AnimatePresence>{renderLineItems(future)}</AnimatePresence>
            </LayoutGroup>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
