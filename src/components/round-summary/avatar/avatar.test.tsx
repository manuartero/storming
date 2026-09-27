import { render, screen } from "@testing-library/react";
import { Avatar } from "./avatar";

describe("<Avatar />", () => {
  test('the player defaults to "player"', () => {
    render(<Avatar />);

    screen.getByRole("img", { name: "player avatar" });
  });

  (
    [
      { player: "player" },
      { player: "enemy1" },
      { player: "enemy2" },
      { player: "enemy3" },
    ] as const
  ).forEach(({ player }) => {
    test(`shows the ${player} avatar`, () => {
      render(<Avatar player={player} />);

      expect(
        screen.getByRole("img", { name: `${player} avatar` })
      ).toHaveAttribute("aria-roledescription", "game avatar");
    });
  });
});
