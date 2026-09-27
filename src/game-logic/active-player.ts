/*
 * `next` also holds the FUTURE cards carried over from the previous round:
 * always a multiple of the player count, so `% players.length` still works.
 */

export function activePlayer({
  phase,
  activeCard,
  next,
  players,
}: {
  phase: PhaseType;
  activeCard: Card | undefined;
  next: TimelineCard[];
  players: PlayerStatus[];
}) {
  if (phase === "planification") {
    const committed = next.filter((timelineCard) => timelineCard.commited);
    return players[committed.length % players.length]?.player;
  }
  if (phase === "action" && activeCard?.cardType === "actionCard") {
    return activeCard.owner;
  }
  return undefined;
}

/* `next` includes the card being submitted */
export function isPlanningComplete({
  next,
  players,
}: {
  next: TimelineCard[];
  players: PlayerStatus[];
}) {
  return next.length > 0 && next.length % players.length === 0;
}
