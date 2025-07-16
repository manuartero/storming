import { render, screen } from "@testing-library/react";
import { Dialog } from "./dialog";

describe("<Dialog />", () => {
  test("render: dialog role [no title]", () => {
    render(<Dialog onClose={jest.fn()} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toMatchSnapshot();
  });

  test("render: dialog role [with title]", () => {
    render(<Dialog title="Test Dialog" onClose={jest.fn()} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toMatchSnapshot();
  });

  test("calls onClose() when exit button is clicked", () => {
    const onClose = jest.fn();
    render(<Dialog title="Test Dialog" onClose={onClose} />);

    const exitButton = screen.getByLabelText("close dialog");
    exitButton.click();

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
