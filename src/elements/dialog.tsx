import c from "classnames";
import { useId } from "react";

import styles from "./dialog.module.css";

type Props = {
  title?: string;
  size?: "regular" | "small";
  onClose: () => void;
} & React.ComponentProps<"div">;

export function Dialog({
  title,
  size = "regular",
  children,
  onClose,
  ...rest
}: Props) {
  const titleId = title ? `dialog-title-${useId()}` : undefined;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      className={c(styles.dialogScreen)}
      tabIndex={-1}
      {...rest}
    >
      <div
        className={c(
          styles.dialog,
          size === "small" ? styles.small : styles.regular
        )}
      >
        <button
          className={styles.exitButton}
          aria-label="close dialog"
          onClick={onClose}
        >
          X
        </button>
        <div className={styles.header}>
          {title && (
            <h2 className={styles.title} id={titleId}>
              {title}
            </h2>
          )}
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
