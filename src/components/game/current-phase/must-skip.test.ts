import { mustSkip } from "./must-skip";
import { emptyBoard } from "contexts/game-context/empty-board";
import { initialBoard } from "contexts/game-context/initial-board";
import { Card } from "models/card";

describe("mustSkip()", () => {
  test("returns true if no available tiles for action card", () => {
    const gameContext = {
      activeCard: Card("build", "player"),
      board: emptyBoard,
    } as GameContext;
    expect(mustSkip(gameContext)).toBe(true);
  });

  test("returns false if there are available tiles for action card", () => {
    const gameContext = {
      activeCard: Card("build", "player"),
      board: initialBoard,
    } as GameContext;
    expect(mustSkip(gameContext)).toBe(false);
  });
});
