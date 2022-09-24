const initialTimeline: TimelineState = {
  current: undefined,
  next: [
    // example
    { cardType: "actionCard", card: "build", owner: "enemy" },
    { cardType: "actionCard", card: "move", owner: "enemy" },
    { cardType: "actionCard", card: "build", owner: "player" },
    { cardType: "actionCard", card: "recruit", owner: "enemy" },
  ],
  future: [
    // example
    { cardType: "actionCard", card: "move", owner: "enemy" },
    { cardType: "actionCard", card: "recruit", owner: "enemy" },
    { cardType: "actionCard", card: "move", owner: "player" },
    { cardType: "actionCard", card: "diplo", owner: "enemy" },
    { cardType: "actionCard", card: "move", owner: "enemy" },
    { cardType: "actionCard", card: "recruit", owner: "enemy" },
    { cardType: "actionCard", card: "move", owner: "player" },
    { cardType: "actionCard", card: "diplo", owner: "enemy" },
  ],
};

export default initialTimeline;
