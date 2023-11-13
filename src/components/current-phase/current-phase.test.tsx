import { render } from "@testing-library/react";
import { CurrentPhase } from "./current-phase";
import { NewCard } from "models/new-card";

describe("<CurrentPhase />", () => {
  test("render: match snapshot - action", () => {
    const { asFragment } = render(
      <CurrentPhase
        phase="action"
        activePlayer="player"
        activeCard={NewCard("move", "player")}
        mustSkip={false}
        onSkip={jest.fn()}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("render: match snapshot - planification", () => {
    const { asFragment } = render(
      <CurrentPhase
        phase="planification"
        activePlayer="player"
        onSubmitPlan={jest.fn()}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("render: match snapshot - planification with cards", () => {
    const { asFragment } = render(
      <CurrentPhase
        phase="planification"
        activePlayer="player"
        nextAction={NewCard("move", "player")}
        futureAction={NewCard("recruit", "player")}
        onSubmitPlan={jest.fn()}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
