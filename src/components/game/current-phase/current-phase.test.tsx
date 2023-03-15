import { render } from "@testing-library/react";
import { CurrentPhase } from "./current-phase";

describe("<CurrentPhase />", () => {
  test("render: match snapshot", () => {
    const { asFragment } = render(<CurrentPhase onSkip={jest.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
