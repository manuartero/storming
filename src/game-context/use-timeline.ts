import type { TimelineState } from "game-logic/timeline.transitions";
import {
  timelineAfterActionStart,
  timelineAfterSubmit,
  timelineAfterNextCard,
  timelineAfterPlan,
  timelineAfterPlanningStart,
  timelineAfterGameOver,
} from "game-logic/timeline.transitions";
import { useState } from "react";

export const initialTimeline: TimelineState = {
  phase: "planification", // TODO: setup
  winner: undefined,
  activeCard: undefined,
  next: [],
  future: [],
};

/**
 * plain react state + named update methods
 *
 * - **no game logic**
 * - **no console.log**
 * - **no inconsistent state**
 *
 * Every setter updates from the current state, so several of them can run
 * in the same event (e.g. submit the plan, then start the action phase)
 * without one overwriting the other.
 */
export function useTimeline() {
  const [timeline, setTimeline] = useState(initialTimeline);

  return {
    ...timeline,
    startPlanningPhase: () => setTimeline(timelineAfterPlanningStart),
    startActionPhase: () => setTimeline(timelineAfterActionStart),
    nextActiveCard: () => setTimeline(timelineAfterNextCard),
    endGame: (winner: PlayerType) =>
      setTimeline((timeline) => timelineAfterGameOver({ timeline, winner })),
    planAction: (actions: Actions) =>
      setTimeline((timeline) => timelineAfterPlan({ timeline, actions })),
    submitPlanification: () => setTimeline(timelineAfterSubmit),
    _overrideTimeline: setTimeline,
  };
}
