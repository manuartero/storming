import type { KeyboardEvent } from "react";

/**
 * Props that make a non-`<button>` element (a card `<article>`) act as one:
 * the `button` role, focusable, and Enter / Space click it.
 * Without `onClick` the element keeps its own role.
 */
export function asButton(onClick: (() => void) | undefined) {
  if (!onClick) {
    return {};
  }
  return {
    role: "button",
    tabIndex: 0,
    onClick,
    onKeyDown: (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick();
      }
    },
  };
}
