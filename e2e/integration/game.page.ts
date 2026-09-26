import type { Page } from "@playwright/test";

export type Player = "player" | "enemy1" | "enemy2" | "enemy3";
export type ActionCard = "Build" | "Move" | "Recruit" | "Diplomacy";

export const PLAYERS: Player[] = ["player", "enemy1", "enemy2", "enemy3"];

type PlayerCard = { player: Player; card: ActionCard };

export function gamePage(page: Page) {
  const currentPhase = page.getByRole("region", { name: "current phase" });
  const hand = page.getByRole("region", { name: "player hand" });
  const board = page.getByRole("region", { name: "game board" });
  const timeline = page.getByRole("region", { name: "timeline" });
  const dialog = page.getByRole("dialog");

  const locators = {
    phaseTitle: currentPhase.getByRole("heading", { level: 1 }),
    turn: (player: Player) =>
      currentPhase.getByRole("img", { name: `${player}'s turn` }),
    confirmPlan: currentPhase.getByRole("button", { name: "Confirm plan" }),
    emptyNextSlot: currentPhase.getByLabel("empty next slot"),
    emptyFutureSlot: currentPhase.getByLabel("empty future slot"),
    plannedCard: ({ player, card }: PlayerCard) =>
      currentPhase.getByRole("button", { name: `${player} ${card} card` }),
    activeCard: ({ player, card }: PlayerCard) =>
      currentPhase.getByRole("article", { name: `${player} ${card} card` }),
    // the hand holds two identical Move cards: either one will do
    handCard: ({ player, card }: PlayerCard) =>
      hand.getByRole("button", { name: `${player} ${card} card` }).first(),
    next: timeline.getByRole("list", { name: "NEXT" }).getByRole("listitem"),
    future: timeline
      .getByRole("list", { name: "FUTURE" })
      .getByRole("listitem"),
    tileWith: (content: string) =>
      board
        .getByRole("button", { name: /^tile / })
        .filter({ has: page.getByRole("img", { name: content }) }),
    dialog,
  };

  const goto = async () => {
    await page.goto("/");
  };

  const planCard = async (playerCard: PlayerCard) => {
    await locators.handCard(playerCard).click();
  };

  const plan = async ({
    player,
    next,
    future,
  }: {
    player: Player;
    next: ActionCard;
    future: ActionCard;
  }) => {
    await planCard({ player, card: next });
    await planCard({ player, card: future });
    await locators.confirmPlan.click();
  };

  const planRound = async ({
    next,
    future,
  }: {
    next: ActionCard;
    future: ActionCard;
  }) => {
    for (const player of PLAYERS) {
      await plan({ player, next, future });
    }
  };

  const recruitSoldier = async (player: Player) => {
    await locators.tileWith(`${player} tower`).click();
    await dialog.getByRole("button", { name: "recruit soldier" }).click();
  };

  return { ...locators, goto, planCard, plan, planRound, recruitSoldier };
}

export type GamePage = ReturnType<typeof gamePage>;
