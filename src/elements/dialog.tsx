import c from "classnames";

import styles from "./dialog.module.css";

type Props = {
  title?: string;
  size?: "regular" | "small";
  onClose: () => void;
} & React.ComponentProps<"div">;

export function Dialog({ title, size = "regular", children, onClose }: Props) {
  return (
    <div role="dialog" aria-modal="true" className={c(styles.dialogScreen)}>
      <div
        className={c(
          styles.dialog,
          size === "small" ? styles.small : styles.regular
        )}
      >
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <button onClick={onClose}>X</button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
