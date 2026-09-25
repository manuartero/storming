import { act, renderHook } from "@testing-library/react";
import { useTimeline } from "./use-timeline";
import { NewCard } from "models/new-card";

describe("useTimeline()", () => {
  test("initial state", () => {
    const { result } = renderHook(() => useTimeline());

    expect(result.current.phase).toBe("planification"); // TODO: setup
    expect(result.current.activeCard).toBe(undefined);
    expect(result.current.next).toEqual([]);
    expect(result.current.future).toEqual([]);
  });

  test("startPlanningPhase()", () => {
    const { result } = renderHook(() => useTimeline());

    act(() => {
      result.current.startPlanningPhase();
    });

    expect(result.current.phase).toBe("planification");
    expect(result.current.activeCard).toBe(undefined);
    expect(result.current.next).toEqual([]);
    expect(result.current.future).toEqual([]);
  });

  test("planAction()", async () => {
    const { result } = renderHook(() => useTimeline());

    const nextActionCard = NewCard({ type: "recruit", player: "player" });
    const futureActionCard = NewCard({ type: "move", player: "player" });

    act(() => {
      result.current.startPlanningPhase();
    });

    act(() => {
      result.current.planAction({ nextActionCard, futureActionCard });
    });

    expect(result.current.phase).toBe("planification");
    expect(result.current.activeCard).toBe(undefined);
    expect(result.current.next).toEqual([
      { card: nextActionCard, commited: false },
    ]);
    expect(result.current.future).toEqual([
      { card: futureActionCard, commited: false },
    ]);
  });

  test("planAction() - clean action card", () => {
    const { result } = renderHook(() => useTimeline());

    const nextActionCard = NewCard({ type: "recruit", player: "player" });
    const futureActionCard = NewCard({ type: "move", player: "player" });

    act(() => {
      result.current.startPlanningPhase();
    });

    act(() => {
      result.current.planAction({ nextActionCard, futureActionCard });
    });

    act(() => {
      result.current.planAction({
        nextActionCard: null,
        futureActionCard: undefined,
      });
    });

    expect(result.current.phase).toBe("planification");
    expect(result.current.activeCard).toBe(undefined);
    expect(result.current.next).toEqual([]);
    expect(result.current.future).toEqual([
      { card: futureActionCard, commited: false },
    ]);
  });

  test("submitPlanification()", () => {
    const { result } = renderHook(() => useTimeline());

    const nextActionCard = NewCard({ type: "recruit", player: "player" });
    const futureActionCard = NewCard({ type: "move", player: "player" });

    act(() => {
      result.current.startPlanningPhase();
    });

    act(() => {
      result.current.planAction({ nextActionCard, futureActionCard });
    });

    act(() => {
      result.current.submitPlanification();
    });

    expect(result.current.phase).toBe("planification");
    expect(result.current.activeCard).toBe(undefined);
    expect(result.current.next).toEqual([
      { card: nextActionCard, commited: true },
    ]);
    expect(result.current.future).toEqual([
      { card: futureActionCard, commited: true },
    ]);
  });

  test("startActionPhase()", () => {
    const { result } = renderHook(() => useTimeline());

    const nextActionCard = NewCard({ type: "recruit", player: "player" });
    const futureActionCard = NewCard({ type: "move", player: "player" });

    act(() => {
      result.current.startPlanningPhase();
    });

    act(() => {
      result.current.planAction({ nextActionCard, futureActionCard });
    });

    act(() => {
      result.current.submitPlanification();
    });

    act(() => {
      result.current.startActionPhase();
    });

    expect(result.current.phase).toBe("action");
    expect(result.current.activeCard).toEqual(nextActionCard);
    expect(result.current.next).toEqual([]);
    expect(result.current.future).toEqual([
      { card: futureActionCard, commited: true },
    ]);
  });

  test("submitPlanification() + startActionPhase() in the same event keep the commit", () => {
    const { result } = renderHook(() => useTimeline());

    const firstNext = NewCard({ type: "recruit", player: "player" });
    const secondNext = NewCard({ type: "move", player: "enemy1" });

    act(() => {
      result.current.planAction({
        nextActionCard: firstNext,
        futureActionCard: NewCard({ type: "build", player: "player" }),
      });
    });
    act(() => {
      result.current.submitPlanification();
    });
    act(() => {
      result.current.planAction({
        nextActionCard: secondNext,
        futureActionCard: NewCard({ type: "build", player: "enemy1" }),
      });
    });

    // what the provider does when the last player submits their plan
    act(() => {
      result.current.submitPlanification();
      result.current.startActionPhase();
    });

    expect(result.current.phase).toBe("action");
    expect(result.current.activeCard).toEqual(firstNext);
    expect(result.current.next).toEqual([{ card: secondNext, commited: true }]);
  });
});
