import { act, renderHook } from "@testing-library/react";
import { initialBoard } from "./initial-board";
import { useBoard } from "./use-board";

describe("useBoard()", () => {
  test("starts from the initial board", () => {
    const { result } = renderHook(() => useBoard());

    expect(result.current.board).toBe(initialBoard);
  });

  test("setters in the same event all apply", () => {
    const { result } = renderHook(() => useBoard());
    const soldier: Piece = { owner: "enemy3", type: "soldier" };

    act(() => {
      result.current.movePiece({ piece: soldier, from: "0,2", to: "1,2" });
      result.current.buildOnTile({
        tile: "1,2",
        building: { owner: "enemy3", type: "tower" },
      });
    });

    expect(result.current.board["0,2"].piece).toBeUndefined();
    expect(result.current.board["1,2"]).toMatchObject({
      piece: soldier,
      building: { owner: "enemy3", type: "tower" },
    });
  });
});
