import { act, renderHook } from "@testing-library/react";
import { initialPlayerStatus, usePlayers } from "./use-players";

describe("usePlayers()", () => {
  test("starts with every player at 0 points", () => {
    const { result } = renderHook(() => usePlayers());

    expect(result.current.players).toBe(initialPlayerStatus);
  });

  test("setters in the same event all apply", () => {
    const { result } = renderHook(() => usePlayers());

    act(() => {
      result.current.scorePoint("enemy1");
      result.current.reorderPlayers((current) => [...current].reverse());
      result.current.declareGreatestEmpire("enemy3");
    });

    expect(result.current.players).toEqual([
      { player: "enemy3", points: 0, greatestEmpirePoint: true },
      { player: "enemy2", points: 0, greatestEmpirePoint: false },
      { player: "enemy1", points: 1, greatestEmpirePoint: false },
      { player: "player", points: 0, greatestEmpirePoint: false },
    ]);
  });
});
