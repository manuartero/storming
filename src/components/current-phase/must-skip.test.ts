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

  test("returns true if no piece can move", () => {
    const lake: Tile = { terrain: "lake" };
    const ownSoldier: Tile = { piece: { owner: "player", type: "soldier" } };
    const gameContext = {
      activeCard: NewCard({ type: "move", player: "player" }),
      board: {
        ...emptyBoard,
        "0,0": ownSoldier,
        "0,-1": lake,
        "1,-1": lake,
        "-1,0": lake,
        "1,0": ownSoldier,
        "0,1": lake,
        "1,1": lake,
        "2,0": lake,
        "2,-1": lake,
        "2,1": lake,
      },
    };
    expect(mustSkip(gameContext)).toBe(true);
  });
});
