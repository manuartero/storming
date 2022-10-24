import { useState } from "react";
import initialTimeline from "./initial-timeline";

export function useTimeline() {
  const [timeline, setTimeline] = useState(initialTimeline);

  const nextCard = () => {
    console.debug("GameContext.nextCard()");
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

  const planCard = ({
    card,
    section,
  }: {
    card: Card;
    section: "next" | "future";
  }) => {
    // TODO
  };

  return {
    timeline,
    nextCard,
    planCard,
  };
}

export const emptyTimeline: Timeline = {
  current: undefined,
  next: [],
  future: [],
};
