import { render } from "@testing-library/react";
import { Tile } from "./tile";

describe("<Tile />", () => {
  test("render: match snapshot", () => {
    const { asFragment } = render(<Tile id="-1,0" onClick={jest.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
