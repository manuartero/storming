import { render, screen } from "@testing-library/react";
import { Piece } from "./piece.component";

describe("<Piece />", () => {
  test('render: "soldier" piece', () => {
    render(<Piece />);
    const playerSoldier = screen.getByRole("img", { name: "player soldier" });
    expect(playerSoldier).toMatchSnapshot();
  });

  test('render: "knight" piece', () => {
    render(<Piece type="knight" />);
    screen.getByRole("img", { name: "player knight" });
  });
});
