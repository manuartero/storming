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

  test.todo("returns building spots for 'building' action");
  test.todo("returns tiles in range for 'move' action");
});
