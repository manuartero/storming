import { render, screen } from "@testing-library/react";
import { Avatar } from "./avatar";

describe("<Avatar />", () => {
  test('render: "player" avatar', () => {
    render(<Avatar />);
    const playerAvatar = screen.getByRole("img", { name: "player avatar" });
    expect(playerAvatar).toMatchSnapshot();
  });

  test('render: "enemy1" avatar', () => {
    render(<Avatar player="enemy1" />);
    const enemy1Avatar = screen.getByRole("img", { name: "enemy1 avatar" });
    expect(enemy1Avatar).toBeInTheDocument();
  });
});
