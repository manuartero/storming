import c from "classnames";
import "./button.scss";

type Props = { children: React.ReactNode } & React.ComponentProps<"button">;

export function Button({ className, children, ...props }: Props) {
  return (
    <button className={c("button", className)} {...props}>
      {children}
    </button>
  );
}
