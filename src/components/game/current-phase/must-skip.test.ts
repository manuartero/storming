import { mustSkip } from "./must-skip";
import { emptyBoard } from "contexts/game-context/empty-board";
import { initialBoard } from "contexts/game-context/initial-board";

test("mustSkip() returns true if no available tiles for action card", () => {
  const gameContext = {
    activeCard: {
      cardType: "actionCard",
      action: "build",
      owner: "player",
      cardId: "player_build_A",
    },
    board: emptyBoard,
  } as GameContext;
  expect(mustSkip(gameContext)).toBe(true);
});

test("mustSkip() returns false if there are available tiles for action card", () => {
  const gameContext = {
    activeCard: {
      cardType: "actionCard",
      action: "build",
      owner: "player",
      cardId: "player_build_A",
    },
    board: initialBoard,
  } as GameContext;
  expect(mustSkip(gameContext)).toBe(false);
});
