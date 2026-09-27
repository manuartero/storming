import { NewCard } from "models/new-card";
import type { TimelineState } from "./timeline.transitions";
import {
  withActionPhase,
  withCommittedPlan,
  withNextActiveCard,
  withPlan,
  withPlanningPhase,
  withWinner,
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

describe("withPlan()", () => {
  test("replaces the pending cards", () => {
    const planned = withPlan({
      timeline: planning,
      actions: { nextActionCard: build, futureActionCard: move },
    });

    const replanned = withPlan({
      timeline: planned,
      actions: { nextActionCard: move, futureActionCard: null },
    });

    expect(replanned.next).toEqual([{ card: move, commited: false }]);
    expect(replanned.future).toEqual([]);
  });

  test("keeps a pending card when its action is undefined", () => {
    const planned = withPlan({
      timeline: planning,
      actions: { nextActionCard: build, futureActionCard: undefined },
    });

    expect(planned.next).toEqual([{ card: build, commited: false }]);
    expect(planned.future).toBe(planning.future);
  });
});

describe("withCommittedPlan()", () => {
  test("commits the pending cards", () => {
    const planned = withPlan({
      timeline: planning,
      actions: { nextActionCard: build, futureActionCard: move },
    });

    const submitted = withCommittedPlan(planned);

    expect(submitted.next).toEqual([{ card: build, commited: true }]);
    expect(submitted.future).toEqual([{ card: move, commited: true }]);
  });
});

describe("withNextActiveCard()", () => {
  test("reveals the first NEXT card", () => {
    const timeline = {
      ...planning,
      phase: "action" as const,
      next: [
        { card: build, commited: true },
        { card: move, commited: true },
      ],
    };

    const next = withNextActiveCard(timeline);

    expect(next.activeCard).toEqual(build);
    expect(next.next).toEqual([{ card: move, commited: true }]);
  });
});

describe("withActionPhase()", () => {
  test("changes the phase and reveals the first NEXT card", () => {
    const timeline = { ...planning, next: [{ card: build, commited: true }] };

    const action = withActionPhase(timeline);

    expect(action.phase).toBe("action");
    expect(action.activeCard).toEqual(build);
    expect(action.next).toEqual([]);
  });
});

describe("withPlanningPhase()", () => {
  test("moves FUTURE onto NEXT", () => {
    const timeline: TimelineState = {
      ...planning,
      phase: "action",
      activeCard: build,
      future: [{ card: move, commited: true }],
    };

    const next = withPlanningPhase(timeline);

    expect(next.phase).toBe("planification");
    expect(next.activeCard).toBeUndefined();
    expect(next.next).toEqual([{ card: move, commited: true }]);
    expect(next.future).toEqual([]);
  });
});

describe("withWinner()", () => {
  test("ends the game with that winner", () => {
    const timeline = {
      ...planning,
      phase: "action" as const,
      activeCard: build,
    };

    expect(withWinner({ timeline, winner: "enemy1" })).toEqual({
      ...timeline,
      phase: "ended",
      winner: "enemy1",
      activeCard: undefined,
    });
  });
});
