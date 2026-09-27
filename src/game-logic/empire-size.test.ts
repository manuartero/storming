import { empireSize } from "./empire-size";

const board = {
  "-2,3": { building: { owner: "player", type: "tower" } },
  "-1,3": {},
  "0,3": { building: { owner: "enemy2", type: "tower" } },
  "1,3": { building: { owner: "enemy2", type: "castle" } },
  "2,3": { building: { owner: "enemy1", type: "castle" } },
} as Board;

const status = (player: PlayerType): PlayerStatus => ({
  player,
  points: 0,
  greatestEmpirePoint: false,
});

describe("empireSize()", () => {
  test("returns the number of buildings grouped by player", () => {
    const players = (["player", "enemy1", "enemy2", "enemy3"] as const).map(
      status
    );
    expect(empireSize({ board, players })).toEqual({
      player: 1,
      enemy1: 1,
      enemy2: 2,
      enemy3: 0,
    });
  });

  test("has one entry per player, in a 3-player game", () => {
    const players = (["player", "enemy1", "enemy2"] as const).map(status);
    expect(empireSize({ board, players })).toEqual({
      player: 1,
      enemy1: 1,
      enemy2: 2,
    });
  });
});
