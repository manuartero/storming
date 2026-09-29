import { isActionCard } from "models/new-card";

const hide = ({ card, viewer }: { card: Card; viewer: PlayerType }) => {
  if (!isActionCard(card)) {
    return { cardType: "hidden" as const };
  }
  if (card.owner === viewer) {
    return card;
  }
  return { cardType: "hidden" as const, owner: card.owner };
};

const hidePile = ({
  pile,
  viewer,
}: {
  pile: TimelineCard[];
  viewer: PlayerType;
}) =>
  pile.map((timelineCard) => ({
    ...timelineCard,
    card: hide({ card: timelineCard.card, viewer }),
  }));

/**
 * The state as `viewer` sees it: what a bot may decide on.
 * - rules: round.1 other players' cards on PRESENT (`next`) and FUTURE are face down: owner kept, action and cardId dropped
 * - rules: present.1 while resolving, the PRESENT pile is face up
 * - rules: round.3, round.6 face-down events are hidden from everyone, owner included
 * - the active card, the board and the scores stay as they are
 */
export function publicView({
  state,
  viewer,
}: {
  state: GameState;
  viewer: PlayerType;
}): PublicGameState {
  const presentIsFaceUp = state.phase === "action";
  return {
    ...state,
    next: presentIsFaceUp ? state.next : hidePile({ pile: state.next, viewer }),
    future: hidePile({ pile: state.future, viewer }),
  };
}
