import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("<Button />", () => {
  test("renders a button", () => {
    render(<Button>Click Me</Button>);

    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toMatchSnapshot();
  });

  test('applies player class when "player" prop is provided', () => {
    render(<Button player="enemy1">Click Me</Button>);

    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toHaveClass("enemy1");
  });

  test("applies disabled class when disabled prop is true", () => {
    render(<Button disabled>Click Me</Button>);

    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toHaveClass("disabled");
  });
});
