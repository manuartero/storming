import { getAvailableTilesForActionCard } from "./available-tiles";
import { initialBoard } from "contexts/game-context/initial-board";
import { Card, _resetCardId } from "models/card";

const recruitScenarios: { activeCard: ActionCard; expectedTiles: TileID[] }[] =
  [
    {
      activeCard: Card("recruit", "player"),
      expectedTiles: ["-4,0"],
    },
    {
      activeCard: Card("recruit", "enemy1"),
      expectedTiles: ["0,-3"],
    },
    {
      activeCard: Card("recruit", "enemy2"),
      expectedTiles: ["3,0"],
    },
    {
      activeCard: Card("recruit", "enemy3"),
      expectedTiles: ["0,3"],
    },
  ];

describe("getAvailableTilesForActionCard()", () => {
  beforeEach(_resetCardId);

  recruitScenarios.forEach(({ activeCard, expectedTiles }) => {
    test("returns empty villages for 'recruit' action", () => {
      const got = getAvailableTilesForActionCard({
        activeCard,
        board: initialBoard,
      });
      expect(got).toEqual(expectedTiles);
    });
  });

  test.todo("returns building spots for 'building' action");
  test.todo("returns tiles in range for 'move' action");
});
