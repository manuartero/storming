import { useState } from "react";
import initialTimeline from "./initial-timeline";

export function useTimeline() {
  const [timeline, setTimeline] = useState(initialTimeline);

  const nextCard = () => {
    console.info("GameContext.nextCard()");
    setTimeline((currentTimeline) => {
      const current = currentTimeline.next[0];
      const next = currentTimeline.next.slice(1);
      return {
        current,
        next,
        future: currentTimeline.future,
      };
    });
  };

  const planNextCard = ({ card }: { card: ActionCard }) => {
    console.info(`GameContext.planCard({ card: ${card.action}  })`);
    const newTimeline = {
      ...timeline,
      next: timeline.next.concat(card),
    };
    setTimeline(newTimeline);
    return newTimeline
  };

  return {
    timeline,
    nextCard,
    planNextCard,
  };
}

export const emptyTimeline: Timeline = {
  current: undefined,
  next: [],
  future: [],
};
