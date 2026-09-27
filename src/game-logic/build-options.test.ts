import { buildOptions, recruitOptions } from "./build-options";

const tile = "0,0";
const boardWith = (content: Tile) => ({ [tile]: content }) as Board;

describe("buildOptions()", () => {
  test("a soldier on an empty plot settles a tower", () => {
    const board = boardWith({ piece: { type: "soldier", owner: "enemy1" } });
    expect(buildOptions({ board, tile })).toEqual([
      {
        kind: "settle",
        building: { type: "tower", owner: "enemy1", hasWalls: false },
      },
    ]);
  });

  test("a knight can't settle", () => {
    const board = boardWith({ piece: { type: "knight", owner: "enemy1" } });
    expect(buildOptions({ board, tile })).toEqual([]);
  });

  test("an empty tile has no options", () => {
    expect(buildOptions({ board: boardWith({}), tile })).toEqual([]);
  });

  test.each([
    ["tower", "castle"],
    ["castle", "citadel"],
  ] as const)("a %s without walls: walls or upgrade to a %s", (type, next) => {
    const board = boardWith({ building: { type, owner: "player" } });
    expect(buildOptions({ board, tile })).toEqual([
      { kind: "walls", building: { type, owner: "player", hasWalls: true } },
      { kind: "upgrade", building: { type: next, owner: "player" } },
    ]);
  });

  test("a walled building can only be upgraded, and keeps its walls", () => {
    const board = boardWith({
      building: { type: "castle", owner: "player", hasWalls: true },
    });
    expect(buildOptions({ board, tile })).toEqual([
      {
        kind: "upgrade",
        building: { type: "citadel", owner: "player", hasWalls: true },
      },
    ]);
  });

  test("a citadel without walls can only get walls", () => {
    const board = boardWith({ building: { type: "citadel", owner: "player" } });
    expect(buildOptions({ board, tile })).toEqual([
      {
        kind: "walls",
        building: { type: "citadel", owner: "player", hasWalls: true },
      },
    ]);
  });

  test("a walled citadel has no options", () => {
    const board = boardWith({
      building: { type: "citadel", owner: "player", hasWalls: true },
    });
    expect(buildOptions({ board, tile })).toEqual([]);
  });
});

describe("recruitOptions()", () => {
  test("a tower recruits soldiers only, owned by the building's owner", () => {
    const board = boardWith({ building: { type: "tower", owner: "enemy2" } });
    expect(recruitOptions({ board, tile })).toEqual([
      { type: "soldier", owner: "enemy2" },
    ]);
  });

  test.each(["castle", "citadel"] as const)(
    "a %s recruits soldiers and knights",
    (type) => {
      const board = boardWith({ building: { type, owner: "enemy2" } });
      expect(recruitOptions({ board, tile })).toEqual([
        { type: "soldier", owner: "enemy2" },
        { type: "knight", owner: "enemy2" },
      ]);
    }
  );

  test("no options on an occupied building", () => {
    const board = boardWith({
      building: { type: "castle", owner: "enemy2" },
      piece: { type: "soldier", owner: "enemy2" },
    });
    expect(recruitOptions({ board, tile })).toEqual([]);
  });

  test("no options without a building", () => {
    expect(recruitOptions({ board: boardWith({}), tile })).toEqual([]);
  });
});
