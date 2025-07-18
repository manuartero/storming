import { render, screen } from "@testing-library/react";
import { Piece } from "./piece";

describe("<Piece />", () => {
  test('render: "soldier" piece', () => {
    render(<Piece />);
    const playerSoldier = screen.getByRole("img", { name: "player soldier" });
    expect(playerSoldier).toMatchSnapshot();
  });

  test('render: "knight" piece', () => {
    render(<Piece type="knight" />);
    const playerKnight = screen.getByRole("img", { name: "player knight" });
    expect(playerKnight).toBeInTheDocument();
  });
});
