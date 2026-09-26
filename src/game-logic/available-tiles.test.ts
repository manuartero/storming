import { initialBoard } from "game-context/initial-board";
import { NewCard, _resetCardId } from "models/new-card";
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
  beforeEach(_resetCardId);

  test.each(recruitScenarios)(
    "returns empty villages for 'recruit' action ($activeCard.owner)",
    ({ activeCard, expectedTiles }) => {
      const got = getAvailableTilesForActionCard({
        activeCard,
        board: initialBoard,
      });
      expect(got).toEqual(expectedTiles);
    }
  );

  test.each([
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
  ] as const)(
    "'build' action on $name: available is $available",
    ({ building, available }) => {
      const board = {
        "0,0": { building: { owner: "player", ...building } },
        "1,0": { building: { owner: "enemy1", type: "tower" } },
      } as Board;
      const got = getAvailableTilesForActionCard({
        activeCard: NewCard({ type: "build", player: "player" }),
        board,
      });
      expect(got).toEqual(available ? ["0,0"] : []);
    }
  );

  test.each<{ name: string; board: Partial<Board>; available: boolean }>([
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
  ])(
    "'build' action with a soldier on $name: available is $available",
    ({ board, available }) => {
      const got = getAvailableTilesForActionCard({
        activeCard: NewCard({ type: "build", player: "player" }),
        board: board as Board,
      });
      expect(got).toEqual(available ? ["0,0"] : []);
    }
  );

  test.todo("returns tiles in range for 'move' action");
});
