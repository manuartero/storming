import type { ButtonHTMLAttributes } from "react";

import "./button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button(props: ButtonProps): JSX.Element {
  return (
    <button className="button" {...props}>
      {props.children}
    </button>
  );
}
