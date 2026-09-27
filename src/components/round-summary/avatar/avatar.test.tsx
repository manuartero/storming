import { render, screen } from "@testing-library/react";
import { Avatar } from "./avatar";

describe("<Avatar />", () => {
  test('the player defaults to "player"', () => {
    render(<Avatar />);

    screen.getByRole("img", { name: "player avatar" });
  });

  (["player", "enemy1", "enemy2", "enemy3"] as const).forEach((player) => {
    test(`shows the ${player} avatar`, () => {
      render(<Avatar player={player} />);

      expect(
        screen.getByRole("img", { name: `${player} avatar` })
      ).toHaveAttribute("aria-roledescription", "game avatar");
    });
  });
});
