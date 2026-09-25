import { emptyBoard } from "game-context/empty-board";
import { initialBoard } from "game-context/initial-board";
import { NewCard } from "models/new-card";
import { mustSkip } from "./must-skip";

describe("mustSkip()", () => {
  test("returns true if no available tiles for action card", () => {
    const gameContext = {
      activeCard: NewCard({ type: "build", player: "player" }),
      board: emptyBoard,
    };
    expect(mustSkip(gameContext)).toBe(true);
  });

  test("returns false if there are available tiles for action card", () => {
    const gameContext = {
      activeCard: NewCard({ type: "build", player: "player" }),
      board: initialBoard,
    };
    expect(mustSkip(gameContext)).toBe(false);
  });
});
