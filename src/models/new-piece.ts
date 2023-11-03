export function NewPiece(piece: { type: PieceType; owner: PlayerType }) {
  const toString = () => `Piece{ ${piece.type}, ${piece.owner} }`;
  Object.setPrototypeOf(piece, { toString });
  return piece;
}
