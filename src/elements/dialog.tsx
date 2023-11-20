import c from "classnames";
import type { HTMLAttributes, ReactElement } from "react";

import "./dialog.scss";

interface Props extends HTMLAttributes<HTMLElement> {
  children: ReactElement;
  size?: "regular" | "small";
  onClose: () => void;
}

export function Dialog({ children, size = "regular", onClose }: Props) {
  return (
    <div role="dialog" aria-modal="true" className="dialog">
      <div
        className={c(size === "small" ? "dialog--small" : "dialog--regular")}
      >
        <button onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
}
