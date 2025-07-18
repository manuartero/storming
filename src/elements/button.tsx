import c from "classnames";

import styles from "./button.module.css";

type Props = {
  player?: PlayerType;
} & React.ComponentProps<"button">;

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
      {...props}
    >
      {children}
    </button>
  );
}
