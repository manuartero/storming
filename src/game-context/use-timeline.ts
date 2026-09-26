import { useReducer } from "react";

type TimelineState = {
  phase: PhaseType;
  winner: PlayerType | undefined;
  activeCard: Card | undefined;
  next: TimelineCard[];
  future: TimelineCard[];
};

type TimelineAction =
  | { type: "startPlanningPhase" }
  | { type: "startActionPhase" }
  | { type: "nextActiveCard" }
  | { type: "endGame"; winner: PlayerType }
  | { type: "planAction"; actions: Actions }
  | { type: "submitPlanification" }
  | { type: "override"; state: TimelineState };

export const initialTimeline: TimelineState = {
  phase: "planification", // TODO: setup
  winner: undefined,
  activeCard: undefined,
  next: [],
  future: [],
};

const commit = (timelineCards: TimelineCard[]) =>
  timelineCards.map((timelineCard) => ({ ...timelineCard, commited: true }));

const replacePending = ({
  timelineCards,
  card,
}: {
  timelineCards: TimelineCard[];
  card: ActionCard | null | undefined;
}) => {
  if (card === undefined) {
    return timelineCards;
  }
  const committed = timelineCards.filter(
    (timelineCard) => timelineCard.commited
  );
  return card === null
    ? committed
    : committed.concat({ card, commited: false });
};

/*
  Every transition reads the current state, so several of them can be
  dispatched from the same event (e.g. submit the plan, then start the
  action phase) without one overwriting the other.
*/
// annotated: it calls itself (startActionPhase → nextActiveCard)
function timelineReducer(
  state: TimelineState,
  action: TimelineAction
): TimelineState {
  switch (action.type) {
    case "startPlanningPhase":
      return {
        ...state,
        phase: "planification" as const,
        activeCard: undefined,
        next: state.next.concat(state.future),
        future: [],
      };
    case "startActionPhase":
      return timelineReducer(
        { ...state, phase: "action" },
        { type: "nextActiveCard" }
      );
    case "nextActiveCard":
      return {
        ...state,
        activeCard: state.next[0]?.card,
        next: state.next.slice(1),
      };
    case "endGame":
      return {
        ...state,
        phase: "ended",
        winner: action.winner,
        activeCard: undefined,
      };
    case "planAction":
      return {
        ...state,
        next: replacePending({
          timelineCards: state.next,
          card: action.actions.nextActionCard,
        }),
        future: replacePending({
          timelineCards: state.future,
          card: action.actions.futureActionCard,
        }),
      };
    case "submitPlanification":
      return {
        ...state,
        next: commit(state.next),
        future: commit(state.future),
      };
    case "override":
      return action.state;
  }
}

/**
 * plain react state + named update methods
 *
 * - **no game logic**
 * - **no console.log**
 * - **no inconsistent state**
 */
export function useTimeline() {
  const [timeline, dispatch] = useReducer(timelineReducer, initialTimeline);

  return {
    ...timeline,
    startPlanningPhase: () => dispatch({ type: "startPlanningPhase" }),
    startActionPhase: () => dispatch({ type: "startActionPhase" }),
    nextActiveCard: () => dispatch({ type: "nextActiveCard" }),
    endGame: (winner: PlayerType) => dispatch({ type: "endGame", winner }),
    planAction: (actions: Actions) => dispatch({ type: "planAction", actions }),
    submitPlanification: () => dispatch({ type: "submitPlanification" }),
    _overrideTimeline: (state: TimelineState) =>
      dispatch({ type: "override", state }),
  };
}
