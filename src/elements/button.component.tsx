import c from "classnames";
import type { ComponentProps } from "react";

import styles from "./button.module.css";

type Props = {
  player?: PlayerType;
} & ComponentProps<"button">;

export function Button({
  player,
  disabled = false,
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      className={c(
        styles.button,
        className,
        disabled && styles.disabled,
        player && styles[player]
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
