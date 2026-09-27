export type TimelineState = {
  phase: PhaseType;
  winner: PlayerType | undefined;
  activeCard: Card | undefined;
  next: TimelineCard[];
  future: TimelineCard[];
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

/* plain timeline → timeline updates: no validity check, no game logic */

export function withPlanningPhase(timeline: TimelineState) {
  return {
    ...timeline,
    phase: "planification" as const,
    activeCard: undefined,
    next: timeline.next.concat(timeline.future),
    future: [],
  };
}

export function withNextActiveCard(timeline: TimelineState) {
  return {
    ...timeline,
    activeCard: timeline.next[0]?.card,
    next: timeline.next.slice(1),
  };
}

export function withActionPhase(timeline: TimelineState) {
  return withNextActiveCard({ ...timeline, phase: "action" });
}

export function withWinner({
  timeline,
  winner,
}: {
  timeline: TimelineState;
  winner: PlayerType;
}) {
  return {
    ...timeline,
    phase: "ended" as const,
    winner,
    activeCard: undefined,
  };
}

export function withPlan({
  timeline,
  actions,
}: {
  timeline: TimelineState;
  actions: Actions;
}) {
  return {
    ...timeline,
    next: replacePending({
      timelineCards: timeline.next,
      card: actions.nextActionCard,
    }),
    future: replacePending({
      timelineCards: timeline.future,
      card: actions.futureActionCard,
    }),
  };
}

export function withCommittedPlan(timeline: TimelineState) {
  return {
    ...timeline,
    next: commit(timeline.next),
    future: commit(timeline.future),
  };
}
