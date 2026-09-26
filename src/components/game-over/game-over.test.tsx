import { render, screen } from "@testing-library/react";
import { GameOver } from "./game-over";

describe("<GameOver />", () => {
  test("render: names the winner", () => {
    render(<GameOver winner="enemy1" onNewGame={jest.fn()} />);

    const dialog = screen.getByRole("dialog", { name: "Game over" });
    expect(dialog.textContent).toContain("Red wins");
    expect(dialog).toMatchSnapshot();
  });

  test("can't be closed without starting a new game", () => {
    render(<GameOver winner="player" onNewGame={jest.fn()} />);

    expect(screen.queryByLabelText("close dialog")).toBeNull();
  });

  test("calls onNewGame() when the button is clicked", () => {
    const onNewGame = jest.fn();
    render(<GameOver winner="player" onNewGame={onNewGame} />);

    screen.getByRole("button", { name: "New game" }).click();

    expect(onNewGame).toHaveBeenCalledTimes(1);
  });
});
