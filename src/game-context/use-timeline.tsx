import { useState } from "react";

/**
 * plain react state + named update methods
 *
 * - **no game logic**
 * - **no console.log**
 * - **no inconsistent state**
 */
export function useTimeline() {
  const [phase, setPhase] = useState<PhaseType>("planification"); // TODO: setup
  const [activeCard, setActiveCard] = useState<Card>();
  const [next, setNext] = useState<TimelineCard[]>([]);
  const [future, setFuture] = useState<TimelineCard[]>([]);

  const startPlanningPhase = () => {
    setPhase("planification");
    setNext(next.concat(future));
    setFuture([]);
  };

  const startActionPhase = () => {
    setPhase("action");
    nextActiveCard();
  };

  const nextActiveCard = () => {
    setActiveCard(next[0].card);
    setNext(next.slice(1));
  };

  const planAction = ({
    nextActionCard,
    futureActionCard,
  }: {
    nextActionCard: ActionCard | undefined;
    futureActionCard: ActionCard | undefined;
  }) => {
    if (nextActionCard) {
      setNext(
        next
          .filter((card) => card.commited)
          .concat({ card: nextActionCard, commited: false })
      );
    }
    if (futureActionCard) {
      setFuture(
        future
          .filter((card) => card.commited)
          .concat({ card: futureActionCard, commited: false })
      );
    }
  };

  const submitPlanification = () => {
    setNext(next.map((timelineCard) => ({ ...timelineCard, commited: true })));
    setFuture(
      future.map((timelineCard) => ({ ...timelineCard, commited: true }))
    );
  };

  const _overrideTimeline = ({
    phase,
    activeCard,
    next,
    future,
  }: {
    phase: PhaseType;
    activeCard: Card | undefined;
    next: TimelineCard[];
    future: TimelineCard[];
  }) => {
    setPhase(phase);
    setActiveCard(activeCard);
    setNext(next);
    setFuture(future);
  };

  return {
    phase,
    activeCard,
    next,
    future,
    startActionPhase,
    startPlanningPhase,
    nextActiveCard,
    planAction,
    submitPlanification,
    _overrideTimeline,
  };
}

export const emptyTimeline = {
  phase: "setup" as const,
  activeCard: undefined as Card | undefined,
  next: [] as TimelineCard[],
  future: [] as TimelineCard[],
};
