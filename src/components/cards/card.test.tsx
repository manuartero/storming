import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewCard } from "models/new-card";
import { Card } from "./card";

const actionCard = NewCard({ type: "build", player: "player" });
const buildCard = () =>
  screen.getByRole("button", { name: "player Build card" });

describe("<Card />", () => {
  test("shows the title and the text of the card", () => {
    render(<Card card={actionCard} onClick={jest.fn()} />);

    expect(buildCard()).toHaveTextContent("Build");
    expect(buildCard()).toHaveTextContent("Found a new village");
    expect(buildCard()).toHaveTextContent("Build walls on a settlement");
  });

  test("without onClick, it is an article", () => {
    render(<Card card={actionCard} />);

    screen.getByRole("article", { name: "player Build card" });
  });

  (
    [
      { status: "available", pressed: "false", disabled: "false" },
      { status: "selected", pressed: "true", disabled: "true" },
      { status: "played", pressed: "false", disabled: "true" },
    ] as const
  ).forEach(({ status, pressed, disabled }) => {
    test(`a ${status} card: aria-pressed ${pressed}, aria-disabled ${disabled}`, () => {
      render(<Card card={actionCard} status={status} onClick={jest.fn()} />);

      expect(buildCard()).toHaveAttribute("aria-pressed", pressed);
      expect(buildCard()).toHaveAttribute("aria-disabled", disabled);
    });
  });

  test("Enter and Space click it", async () => {
    const onClick = jest.fn();
    render(<Card card={actionCard} onClick={onClick} />);

    buildCard().focus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");

    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
