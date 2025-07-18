import { useRef } from "react";

/** add a minor random positioning offset to the piece to simulate pieces on a board */
export function usePieceOffset(children: React.ReactNode) {
  const pieceOffsetRef = useRef<"left" | "right">(
    children ? (Math.random() > 0.5 ? "left" : "right") : "left"
  );
  const pieceStyle = children ? { [pieceOffsetRef.current]: "4vh" } : undefined;

  return pieceStyle;
}
