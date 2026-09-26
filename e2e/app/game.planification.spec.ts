import { test, expect } from "../integration/fixtures/test.extend";
import { globalSetup } from "../integration/global.setup";
import { PLAYERS } from "../integration/game.page";

globalSetup();

test.describe("game: planification", () => {
  test("every player plans NEXT and FUTURE, in turn order, then the action phase starts", async ({
    gamePage,
  }) => {
    await gamePage.goto();
    await expect(gamePage.phaseTitle).toHaveText("Planning");

    for (const player of PLAYERS) {
      await expect(gamePage.turn(player)).toBeVisible();

      await gamePage.planCard({ player, card: "Recruit" });
      await gamePage.planCard({ player, card: "Build" });

      await expect
        .soft(gamePage.plannedCard({ player, card: "Recruit" }))
        .toBeVisible();
      await expect
        .soft(gamePage.plannedCard({ player, card: "Build" }))
        .toBeVisible();
      await expect.soft(gamePage.emptyNextSlot).toBeHidden();
      await expect.soft(gamePage.emptyFutureSlot).toBeHidden();

      await gamePage.confirmPlan.click();
    }

    await expect(gamePage.phaseTitle).toHaveText("Action");
    // the first NEXT card leaves the timeline to be resolved
    await expect
      .soft(gamePage.activeCard({ player: "player", card: "Recruit" }))
      .toBeVisible();
    await expect.soft(gamePage.next).toHaveCount(PLAYERS.length - 1);
    await expect.soft(gamePage.future).toHaveCount(PLAYERS.length);
  });
});
