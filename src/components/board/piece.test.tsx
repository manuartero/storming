import { render } from "@testing-library/react";
import { Piece } from "./piece";

describe("<Piece />", () => {
  test("render: match snapshot", () => {
    const { asFragment } = render(<Piece />);
    expect(asFragment()).toMatchSnapshot();
  });
});
