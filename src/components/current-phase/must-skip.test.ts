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

  test("a diplo card never skips", () => {
    const gameContext = {
      activeCard: NewCard({ type: "diplo", player: "player" }),
      board: emptyBoard,
    };
    expect(mustSkip(gameContext)).toBe(false);
  });

  [
    {
      name: "an event card",
      activeCard: NewCard({ type: "event1", player: "player" }),
    },
    { name: "no card", activeCard: undefined },
  ].forEach(({ name, activeCard }) => {
    test(`returns false with ${name}`, () => {
      expect(mustSkip({ activeCard, board: emptyBoard })).toBe(false);
    });
  });
});
