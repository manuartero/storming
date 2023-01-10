import { DialogContent, DialogOverlay } from "@reach/dialog";

import "@reach/dialog/styles.css";
import React from "react";
import "./dialog.scss";

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactElement[];
  isOpen?: boolean;
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
      <DialogContent className="dialog">{props.children}</DialogContent>
    </DialogOverlay>
  );
}
