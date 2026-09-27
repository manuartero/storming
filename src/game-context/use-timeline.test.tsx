import { act, renderHook } from "@testing-library/react";
import { useTimeline } from "./use-timeline";
import { NewCard } from "models/new-card";

describe("useTimeline()", () => {
  test("starts in the planning phase with an empty timeline", () => {
    const { result } = renderHook(() => useTimeline());

    expect(result.current.phase).toBe("planification"); // TODO: setup
    expect(result.current.activeCard).toBe(undefined);
    expect(result.current.next).toEqual([]);
    expect(result.current.future).toEqual([]);
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

  test("nextActiveCard() + startPlanningPhase() in the same event move FUTURE onto NEXT", () => {
    const { result } = renderHook(() => useTimeline());
    const next = NewCard({ type: "recruit", player: "player" });
    const future = NewCard({ type: "move", player: "player" });

    act(() => {
      result.current.planAction({
        nextActionCard: next,
        futureActionCard: future,
      });
      result.current.submitPlanification();
      result.current.startActionPhase();
    });

    // what the provider does when the last NEXT card is resolved
    act(() => {
      result.current.nextActiveCard();
      result.current.startPlanningPhase();
    });

    expect(result.current.phase).toBe("planification");
    expect(result.current.activeCard).toBeUndefined();
    expect(result.current.next).toEqual([{ card: future, commited: true }]);
    expect(result.current.future).toEqual([]);
  });
});
