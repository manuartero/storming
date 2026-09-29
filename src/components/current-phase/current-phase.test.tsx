import { fireEvent, render, screen, within } from "@testing-library/react";
import { NewCard } from "models/new-card";
import { CurrentPhase } from "./current-phase.component";

const currentPhase = () =>
  screen.getByRole("region", { name: "current phase" });

describe("<CurrentPhase />", () => {
  describe("action phase", () => {
    const renderAction = ({
      mustSkip,
      onSkip = jest.fn(),
    }: {
      mustSkip: boolean;
      onSkip?: () => void;
    }) =>
      render(
        <CurrentPhase
          phase="action"
          activePlayer="player"
          activeCard={NewCard({ type: "move", player: "player" })}
          mustSkip={mustSkip}
          onSkip={onSkip}
        />
      );

    test("shows the Action heading, the active player and the active card", () => {
      renderAction({ mustSkip: false });

      within(currentPhase()).getByRole("heading", { name: "Action" });
      within(currentPhase()).getByRole("img", { name: "player's turn" });
      within(currentPhase()).getByRole("article", { name: "player Move card" });
      within(currentPhase()).getByText("Resolving");
    });

    test("Skip is disabled while there is something to do", () => {
      renderAction({ mustSkip: false });

      expect(screen.getByRole("button", { name: "Skip" })).toBeDisabled();
    });

    test("Skip is enabled and calls onSkip when the player must skip", () => {
      const onSkip = jest.fn();
      renderAction({ mustSkip: true, onSkip });

      const skip = screen.getByRole("button", { name: "Skip" });
      expect(skip).toBeEnabled();
      fireEvent.click(skip);

      expect(onSkip).toHaveBeenCalledTimes(1);
    });
  });

  describe("planning phase", () => {
    test("an empty plan shows the empty slots and Confirm plan disabled", () => {
      render(
        <CurrentPhase
          phase="planification"
          activePlayer="player"
          onSubmitPlan={jest.fn()}
          onCleanActionCard={jest.fn()}
        />
      );

      within(currentPhase()).getByRole("heading", { name: "Planning" });
      within(currentPhase()).getByRole("img", { name: "player's turn" });
      const plan = screen.getByRole("group", { name: "Your plan" });
      within(plan).getByRole("article", { name: "empty next slot" });
      within(plan).getByRole("article", { name: "empty future slot" });
      expect(
        screen.getByRole("button", { name: "Confirm plan" })
      ).toBeDisabled();
    });

    describe("a full plan", () => {
      const renderFullPlan = () => {
        const onSubmitPlan = jest.fn();
        const onCleanActionCard = jest.fn();
        render(
          <CurrentPhase
            phase="planification"
            activePlayer="player"
            nextActionCard={NewCard({ type: "move", player: "player" })}
            futureActionCard={NewCard({ type: "recruit", player: "player" })}
            onSubmitPlan={onSubmitPlan}
            onCleanActionCard={onCleanActionCard}
          />
        );
        return { onSubmitPlan, onCleanActionCard };
      };

      test("shows both cards and Confirm plan calls onSubmitPlan", () => {
        const { onSubmitPlan } = renderFullPlan();
        screen.getByRole("button", { name: "player Move card" });
        screen.getByRole("button", { name: "player Recruit card" });

        const confirm = screen.getByRole("button", { name: "Confirm plan" });
        expect(confirm).toBeEnabled();
        fireEvent.click(confirm);

        expect(onSubmitPlan).toHaveBeenCalledTimes(1);
      });

      [
        {
          slot: "NEXT",
          name: "player Move card",
          actions: { nextActionCard: null, futureActionCard: undefined },
        },
        {
          slot: "FUTURE",
          name: "player Recruit card",
          actions: { nextActionCard: undefined, futureActionCard: null },
        },
      ].forEach(({ slot, name, actions }) => {
        test(`clicking the ${slot} card takes it back`, () => {
          const { onCleanActionCard } = renderFullPlan();
          fireEvent.click(screen.getByRole("button", { name }));

          expect(onCleanActionCard).toHaveBeenCalledWith(actions);
        });
      });
    });
  });
});
