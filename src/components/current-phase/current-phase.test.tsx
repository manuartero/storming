import { render } from "@testing-library/react";
import { CurrentPhase } from "./current-phase";

describe("<CurrentPhase />", () => {
  test("render: match snapshot", () => {
    const { asFragment } = render(
      <CurrentPhase
        phase="planification"
        activePlayer="player"
        onSkip={jest.fn()}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
