import { NewCard } from "models/new-card";
import { listSavegames, loadSavegame, savegame } from "./db";

const gameContext = {
  phase: "planification",
  activeCard: undefined,
  next: [{ card: NewCard({ type: "move", player: "player" }), commited: true }],
  future: [],
  board: {},
  players: [],
  activePlayer: "player",
} as unknown as GameContext;

describe("db{}", () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  test("savegame() stores the game state under a versioned key", () => {
    const createdAt = savegame(gameContext);

    expect(Object.keys(window.localStorage)).toEqual([
      `storming:v1:${createdAt}`,
    ]);
    expect(loadSavegame(createdAt!)?.state).toEqual({
      phase: "planification",
      next: gameContext.next,
      future: [],
      board: {},
      players: [],
    });
  });

  test("listSavegames() ignores keys from other apps and old saves", () => {
    window.localStorage.setItem("some-other-app", "{}");
    window.localStorage.setItem("1700000000000", "{}");
    const createdAt = savegame(gameContext);

    expect(listSavegames()).toEqual([createdAt]);
  });

  test("loadSavegame() returns undefined for a malformed save", () => {
    window.localStorage.setItem("storming:v1:1", "not json");
    window.localStorage.setItem("storming:v1:2", JSON.stringify({ foo: 1 }));

    expect(loadSavegame("1")).toBeUndefined();
    expect(loadSavegame("2")).toBeUndefined();
    expect(loadSavegame("3")).toBeUndefined();
  });
});
