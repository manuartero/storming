import { useState } from "react";

export function useTimeline() {
  const [timeline, setTimeline] = useState(emptyTimeline);

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

  const planification = ({ player, nextCard, futureCard }: PlanAction) => {
    console.info(
      `GameContext.planification({ player: ${player}, next: ${nextCard.action}, future: ${futureCard.action} })`
    );
    const newTimeline = {
      current: undefined,
      next: timeline.next.concat(nextCard),
      future: timeline.future.concat(futureCard),
    };
    setTimeline(newTimeline);
    return newTimeline;
  };

  const newTurn = () => {
    console.info(`GameContext.newTurn()`);
    const newTimeline = {
      current: undefined,
      next: timeline.next.concat(timeline.future),
      future: [],
    };
    setTimeline(newTimeline);
    return newTimeline;
  };

  return {
    timeline,
    nextCard,
    planification,
    newTurn,
    _overrideTimeline: setTimeline,
  };
}

export const emptyTimeline: Timeline = {
  current: undefined,
  next: [],
  future: [],
};
