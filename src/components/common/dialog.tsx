import c from "classnames";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import type { HTMLAttributes, ReactElement } from "react";

import "@reach/dialog/styles.css";
import "./dialog.scss";

interface Props extends HTMLAttributes<HTMLElement> {
  children: ReactElement[];
  isOpen?: boolean;
  size?: "regular" | "large";
  onClose?: () => void;
}

export function Dialog(props: Props): JSX.Element {
  return (
    <DialogOverlay
      {...props}
      isOpen={props.isOpen}
      onDismiss={props.onClose}
      style={{ background: "hsla(0, 100%, 100%, 0.9)" }}
    >
      <DialogContent
        className={c(
          "dialog",
          props.size === "large" ? "dialog--large" : "dialog--regular"
        )}
      >
        {props.children}
      </DialogContent>
    </DialogOverlay>
  );
}
