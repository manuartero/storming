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

export function timelineAfterPlanningStart(timeline: TimelineState) {
  return {
    ...timeline,
    phase: "planification" as const,
    activeCard: undefined,
    next: timeline.next.concat(timeline.future),
    future: [],
  };
}

export function timelineAfterNextCard(timeline: TimelineState) {
  return {
    ...timeline,
    activeCard: timeline.next[0]?.card,
    next: timeline.next.slice(1),
  };
}

export function timelineAfterActionStart(timeline: TimelineState) {
  return timelineAfterNextCard({ ...timeline, phase: "action" });
}

export function timelineAfterGameOver({
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

export function timelineAfterPlan({
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

export function timelineAfterSubmit(timeline: TimelineState) {
  return {
    ...timeline,
    next: commit(timeline.next),
    future: commit(timeline.future),
  };
}
