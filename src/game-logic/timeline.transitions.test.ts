import { NewCard } from "models/new-card";
import type { TimelineState } from "./timeline.transitions";
import {
  timelineAfterActionStart,
  timelineAfterSubmit,
  timelineAfterNextCard,
  timelineAfterPlan,
  timelineAfterPlanningStart,
  timelineAfterGameOver,
} from "./timeline.transitions";

const build = NewCard({ type: "build", player: "player" });
const move = NewCard({ type: "move", player: "enemy1" });

const planning: TimelineState = {
  phase: "planification",
  winner: undefined,
  activeCard: undefined,
  next: [],
  future: [],
};

describe("timelineAfterPlan()", () => {
  test("replaces the pending cards", () => {
    const planned = timelineAfterPlan({
      timeline: planning,
      actions: { nextActionCard: build, futureActionCard: move },
    });

    const replanned = timelineAfterPlan({
      timeline: planned,
      actions: { nextActionCard: move, futureActionCard: null },
    });

    expect(replanned.next).toEqual([{ card: move, commited: false }]);
    expect(replanned.future).toEqual([]);
  });

  test("keeps a pending card when its action is undefined", () => {
    const planned = timelineAfterPlan({
      timeline: planning,
      actions: { nextActionCard: build, futureActionCard: move },
    });

    const replanned = timelineAfterPlan({
      timeline: planned,
      actions: { nextActionCard: move, futureActionCard: undefined },
    });

    expect(replanned.next).toEqual([{ card: move, commited: false }]);
    expect(replanned.future).toEqual([{ card: move, commited: false }]);
  });
});

describe("timelineAfterSubmit()", () => {
  test("commits the pending cards", () => {
    const planned = timelineAfterPlan({
      timeline: planning,
      actions: { nextActionCard: build, futureActionCard: move },
    });

    const submitted = timelineAfterSubmit(planned);

    expect(submitted.next).toEqual([{ card: build, commited: true }]);
    expect(submitted.future).toEqual([{ card: move, commited: true }]);
  });
});

describe("timelineAfterNextCard()", () => {
  test("reveals the first NEXT card", () => {
    const timeline = {
      ...planning,
      phase: "action" as const,
      next: [
        { card: build, commited: true },
        { card: move, commited: true },
      ],
    };

    const next = timelineAfterNextCard(timeline);

    expect(next.activeCard).toEqual(build);
    expect(next.next).toEqual([{ card: move, commited: true }]);
  });
});

describe("timelineAfterActionStart()", () => {
  test("changes the phase and reveals the first NEXT card", () => {
    const timeline = { ...planning, next: [{ card: build, commited: true }] };

    const action = timelineAfterActionStart(timeline);

    expect(action.phase).toBe("action");
    expect(action.activeCard).toEqual(build);
    expect(action.next).toEqual([]);
  });
});

describe("timelineAfterPlanningStart()", () => {
  test("moves FUTURE onto NEXT", () => {
    const timeline: TimelineState = {
      ...planning,
      phase: "action",
      activeCard: build,
      future: [{ card: move, commited: true }],
    };

    const next = timelineAfterPlanningStart(timeline);

    expect(next.phase).toBe("planification");
    expect(next.activeCard).toBeUndefined();
    expect(next.next).toEqual([{ card: move, commited: true }]);
    expect(next.future).toEqual([]);
  });
});

describe("timelineAfterGameOver()", () => {
  test("ends the game with that winner", () => {
    const timeline = {
      ...planning,
      phase: "action" as const,
      activeCard: build,
    };

    expect(timelineAfterGameOver({ timeline, winner: "enemy1" })).toEqual({
      ...timeline,
      phase: "ended",
      winner: "enemy1",
      activeCard: undefined,
    });
  });
});
