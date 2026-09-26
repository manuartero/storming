import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewCard } from "models/new-card";
import { Card } from "./card";

const actionCard = NewCard({ type: "build", player: "player" });

describe("<Card />", () => {
  it("render: button role when clickable", () => {
    render(<Card card={actionCard} onClick={jest.fn()} />);

    const card = screen.getByRole("button", { name: "player Build card" });
    expect(card).toMatchSnapshot();
  });

  it("render: article role when not clickable", () => {
    render(<Card card={actionCard} />);

    expect(
      screen.getByRole("article", { name: "player Build card" })
    ).toBeInTheDocument();
  });

  it("Enter and Space click it", async () => {
    const onClick = jest.fn();
    render(<Card card={actionCard} onClick={onClick} />);

    screen.getByRole("button", { name: "player Build card" }).focus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");

    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
