import { emptyBoard } from "game-context/empty-board";
import { initialBoard } from "game-context/initial-board";
import { NewCard } from "models/new-card";
import { getAvailableTilesForActionCard } from "./available-tiles";

const recruitScenarios: { activeCard: ActionCard; expectedTiles: TileID[] }[] =
  [
    {
      activeCard: NewCard({ type: "recruit", player: "player" }),
      expectedTiles: ["-4,0"],
    },
    {
      activeCard: NewCard({ type: "recruit", player: "enemy1" }),
      expectedTiles: ["0,-3"],
    },
    {
      activeCard: NewCard({ type: "recruit", player: "enemy2" }),
      expectedTiles: ["3,0"],
    },
    {
      activeCard: NewCard({ type: "recruit", player: "enemy3" }),
      expectedTiles: ["0,3"],
    },
  ];

const soldier: Piece = { owner: "player", type: "soldier" };

describe("getAvailableTilesForActionCard()", () => {
  recruitScenarios.forEach(({ activeCard, expectedTiles }) => {
    test(`returns empty villages for 'recruit' action (${activeCard.owner})`, () => {
      const got = getAvailableTilesForActionCard({
        activeCard,
        board: initialBoard,
      });
      expect(got).toEqual(expectedTiles);
    });
  });

  test("'recruit' action leaves out a settlement that already has a piece", () => {
    const board = {
      ...emptyBoard,
      "0,0": { building: { owner: "player", type: "tower" }, piece: soldier },
      "2,0": { building: { owner: "player", type: "tower" } },
    } as Board;
    const got = getAvailableTilesForActionCard({
      activeCard: NewCard({ type: "recruit", player: "player" }),
      board,
    });
    expect(got).toEqual(["2,0"]);
  });

  (
    [
      { name: "a village", building: { type: "tower" }, available: true },
      {
        name: "a walled village",
        building: { type: "tower", hasWalls: true },
        available: true,
      },
      { name: "a town", building: { type: "castle" }, available: true },
      {
        name: "a walled town",
        building: { type: "castle", hasWalls: true },
        available: true,
      },
      { name: "a city", building: { type: "citadel" }, available: true },
      {
        name: "a walled city",
        building: { type: "citadel", hasWalls: true },
        available: false,
      },
    ] as const
  ).forEach(({ name, building, available }) => {
    test(`'build' action on ${name}: available is ${available}`, () => {
      const board = {
        "0,0": { building: { owner: "player", ...building } },
        "1,0": { building: { owner: "enemy1", type: "tower" } },
      } as Board;
      const got = getAvailableTilesForActionCard({
        activeCard: NewCard({ type: "build", player: "player" }),
        board,
      });
      expect(got).toEqual(available ? ["0,0"] : []);
    });
  });

  const buildWithSoldierScenarios: {
    name: string;
    board: Partial<Board>;
    available: boolean;
  }[] = [
    {
      name: "an empty tile",
      board: { "0,0": { piece: soldier } },
      available: true,
    },
    {
      name: "a tile two regions from a settlement",
      board: {
        "0,0": { piece: soldier },
        "2,0": { building: { owner: "enemy1", type: "tower" } },
      },
      available: true,
    },
    {
      name: "a tile next to an enemy settlement",
      board: {
        "0,0": { piece: soldier },
        "1,0": { building: { owner: "enemy1", type: "tower" } },
      },
      available: false,
    },
    {
      // a walled citadel can't be built on, so only the plot is in play
      name: "a tile next to its own settlement",
      board: {
        "0,0": { piece: soldier },
        "0,1": {
          building: { owner: "player", type: "citadel", hasWalls: true },
        },
      },
      available: false,
    },
    {
      name: "a forest",
      board: { "0,0": { piece: soldier, terrain: "forest" } },
      available: false,
    },
    {
      name: "a mountain",
      board: { "0,0": { piece: soldier, terrain: "mountain" } },
      available: false,
    },
  ];
  buildWithSoldierScenarios.forEach(({ name, board, available }) => {
    test(`'build' action with a soldier on ${name}: available is ${available}`, () => {
      const got = getAvailableTilesForActionCard({
        activeCard: NewCard({ type: "build", player: "player" }),
        board: board as Board,
      });
      expect(got).toEqual(available ? ["0,0"] : []);
    });
  });

  test("'move' action leaves out pieces that have nowhere to go", () => {
    const lake: Tile = { terrain: "lake" };
    const board = {
      ...emptyBoard,
      "0,0": { piece: soldier },
      "0,-1": lake,
      "1,-1": lake,
      "-1,0": lake,
      "1,0": { piece: soldier },
      "0,1": lake,
      "1,1": lake,
    } as Board;
    const got = getAvailableTilesForActionCard({
      activeCard: NewCard({ type: "move", player: "player" }),
      board,
    });
    expect(got).toEqual(["1,0"]);
  });

  describe("'move' action with a selected piece", () => {
    const move = NewCard({ type: "move", player: "player" });
    const knight: Piece = { owner: "player", type: "knight" };
    const enemy: Piece = { owner: "enemy1", type: "soldier" };
    const movesFrom = ({
      board,
      from,
    }: {
      board: Partial<Board>;
      from: TileID;
    }) =>
      getAvailableTilesForActionCard({
        activeCard: move,
        board: { ...emptyBoard, ...board } as Board,
        selectedTile: from,
      }).sort();

    test("a soldier moves to the adjacent tiles", () => {
      expect(
        movesFrom({ board: { "0,0": { piece: soldier } }, from: "0,0" })
      ).toEqual(["0,-1", "1,-1", "-1,0", "1,0", "0,1", "1,1"].sort());
    });

    test("a knight moves up to two tiles away", () => {
      const got = movesFrom({
        board: { "0,0": { piece: knight } },
        from: "0,0",
      });
      expect(got).toHaveLength(18);
      expect(got).toContain("2,0");
      expect(got).not.toContain("3,0");
    });

    (
      [
        { terrain: "forest", piece: soldier, available: true },
        { terrain: "mountain", piece: soldier, available: true },
        { terrain: "lake", piece: soldier, available: false },
        { terrain: "forest", piece: knight, available: false },
        { terrain: "mountain", piece: knight, available: false },
        { terrain: "lake", piece: knight, available: false },
      ] as const
    ).forEach(({ terrain, piece, available }) => {
      test(`a ${piece.type} can enter a ${terrain}: ${available}`, () => {
        const got = movesFrom({
          board: {
            "0,0": { piece },
            "1,0": { terrain },
          },
          from: "0,0",
        });
        expect(got.includes("1,0")).toBe(available);
      });
    });

    test("its own pieces block a tile, an enemy piece does not", () => {
      const got = movesFrom({
        board: {
          "0,0": { piece: soldier },
          "1,0": { piece: soldier },
          "-1,0": { piece: enemy },
        },
        from: "0,0",
      });
      expect(got).not.toContain("1,0");
      expect(got).toContain("-1,0");
    });

    test("with an enemy piece selected, it lists the own movable pieces", () => {
      const got = movesFrom({
        board: { "0,0": { piece: soldier }, "3,0": { piece: enemy } },
        from: "3,0",
      });
      expect(got).toEqual(["0,0"]);
    });
  });
});
