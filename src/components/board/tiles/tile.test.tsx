import { render, screen } from "@testing-library/react";
import { Tile } from "./tile";

jest.mock("./use-piece-offset");

describe("<Tile />", () => {
  test("render: button role", () => {
    render(<Tile id="-1,0" onClick={jest.fn()} />);

    const tile = screen.getByRole("button", { name: "tile -1,0" });
    expect(tile).toMatchSnapshot();
  });

  test('render: status "selected"', () => {
    render(<Tile id="-1,0" status="selected" onClick={jest.fn()} />);

    const tile = screen.getByRole("button", { name: "tile -1,0" });
    expect(tile).toHaveClass("selected");
  });

  test('render: status "available"', () => {
    render(<Tile id="-1,0" status="available" onClick={jest.fn()} />);

    const tile = screen.getByRole("button", { name: "tile -1,0" });
    expect(tile).toHaveClass("available");
  });

  test("render: building", () => {
    render(
      <Tile id="-1,0" building="tower" owner="player" onClick={jest.fn()} />
    );

    const tile = screen.getByRole("button", { name: "tile -1,0" });
    expect(tile).toMatchSnapshot();
  });
});
