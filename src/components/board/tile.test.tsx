import { render, screen } from "@testing-library/react";
import { Tile } from "./tile";

describe("<Tile />", () => {
  test("render: button role", () => {
    render(<Tile id="-1,0" onClick={jest.fn()} />);
    const tile = screen.getByRole("button", { name: "tile -1,0" });
    expect(tile).toMatchSnapshot();
  });
});
