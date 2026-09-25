import { renderHook } from "@testing-library/react";
import { GameContextProvider, useGameContext } from "./use-game-context";

describe("useGameContext()", () => {
  test("outside the provider, the phase matches the provider's initial phase", () => {
    const { result: outside } = renderHook(() => useGameContext());
    const { result: inside } = renderHook(() => useGameContext(), {
      wrapper: GameContextProvider,
    });

    expect(outside.current.phase).toBe(inside.current.phase);
    expect(outside.current.activeCard).toBe(inside.current.activeCard);
    expect(outside.current.next).toEqual(inside.current.next);
    expect(outside.current.future).toEqual(inside.current.future);
  });
});
