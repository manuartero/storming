import {
  playersAfterGreatestEmpire,
  playersAfterScore,
} from "./players.transitions";

const players: PlayerStatus[] = [
  { player: "player", points: 0, greatestEmpirePoint: true },
  { player: "enemy1", points: 2, greatestEmpirePoint: false },
];

describe("playersAfterScore()", () => {
  test("adds one point to that player only", () => {
    expect(playersAfterScore({ players, player: "enemy1" })).toEqual([
      players[0],
      { ...players[1], points: 3 },
    ]);
  });
});

describe("playersAfterGreatestEmpire()", () => {
  test("moves the greatest-empire point to that player", () => {
    expect(playersAfterGreatestEmpire({ players, player: "enemy1" })).toEqual([
      { ...players[0], greatestEmpirePoint: false },
      { ...players[1], greatestEmpirePoint: true },
    ]);
  });
});
