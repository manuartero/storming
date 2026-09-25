import { render, screen } from "@testing-library/react";
import { NewCard } from "models/new-card";
import { CurrentPhase } from "./current-phase";

describe("<CurrentPhase />", () => {
  test("render: section role - action", () => {
    render(
      <CurrentPhase
        phase="action"
        activePlayer="player"
        activeCard={NewCard({ type: "move", player: "player" })}
        mustSkip={false}
        onSkip={jest.fn()}
      />
    );

    const currentPhase = screen.getByRole("region", { name: "current phase" });
    expect(currentPhase).toMatchSnapshot();
  });

  test("render: section role - planification", () => {
    render(
      <CurrentPhase
        phase="planification"
        activePlayer="player"
        onSubmitPlan={jest.fn()}
        onCleanActionCard={jest.fn()}
      />
    );

    const currentPhase = screen.getByRole("region", { name: "current phase" });
    expect(currentPhase).toMatchSnapshot();
  });

  test("render: section role - planification with cards", () => {
    render(
      <CurrentPhase
        phase="planification"
        activePlayer="player"
        nextActionCard={NewCard({ type: "move", player: "player" })}
        futureActionCard={NewCard({ type: "recruit", player: "player" })}
        onSubmitPlan={jest.fn()}
        onCleanActionCard={jest.fn()}
      />
    );

    const currentPhase = screen.getByRole("region", { name: "current phase" });
    expect(currentPhase).toMatchSnapshot();
  });
});
