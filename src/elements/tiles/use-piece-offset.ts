import { useRef } from "react";

/* % of the tile width, from the left or the right edge */
const PIECE_OFFSET = "30%";

/**
 * add a minor random positioning offset to the piece to simulate pieces on a board
 */
export function usePieceOffset({
  children,
  disableChildrenOffset,
}: {
  children: React.ReactNode;
  disableChildrenOffset?: boolean;
}) {
  const pieceOffsetRef = useRef<"left" | "right">(
    children ? (Math.random() > 0.5 ? "left" : "right") : "left"
  );

  if (disableChildrenOffset) {
    return undefined;
  }

  const pieceStyle = children ? { [pieceOffsetRef.current]: PIECE_OFFSET } : undefined;

  return pieceStyle;
}
