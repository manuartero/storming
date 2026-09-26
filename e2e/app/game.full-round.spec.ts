import { test, expect } from "../integration/fixtures/test.extend";
import { globalSetup } from "../integration/global.setup";
import { PLAYERS } from "../integration/game.page";

globalSetup();

test.describe("game: full round", () => {
  test("resolving every NEXT card starts a new planning, with FUTURE moved to NEXT", async ({
    gamePage,
  }) => {
    await gamePage.goto();
    await gamePage.planRound({ next: "Recruit", future: "Build" });
    await expect(gamePage.phaseTitle).toHaveText("Action");

    for (const player of PLAYERS) {
      await expect(gamePage.turn(player)).toBeVisible();
      await gamePage.recruitSoldier(player);
    }

    await expect(gamePage.phaseTitle).toHaveText("Planning");
    await expect.soft(gamePage.turn("player")).toBeVisible();
    await expect.soft(gamePage.next).toHaveCount(PLAYERS.length);
    await expect.soft(gamePage.future).toHaveCount(0);
    for (const player of PLAYERS) {
      await expect
        .soft(
          gamePage
            .tileWith(`${player} tower`)
            .getByRole("img", { name: `${player} soldier` })
        )
        .toBeVisible();
    }
  });
});
