const initialTimeline: TimelineState = {
  current: undefined,
  next: [
    // example
    { cardType: "actionCard", card: "build", owner: "enemy1" },
    { cardType: "actionCard", card: "move", owner: "enemy2" },
    { cardType: "actionCard", card: "build", owner: "player" },
    { cardType: "actionCard", card: "recruit", owner: "enemy3" },
  ],
  future: [
    // example
    { cardType: "actionCard", card: "move", owner: "enemy1" },
    { cardType: "actionCard", card: "recruit", owner: "enemy2" },
    { cardType: "actionCard", card: "move", owner: "player" },
    { cardType: "actionCard", card: "diplo", owner: "enemy3" },
    { cardType: "actionCard", card: "move", owner: "enemy1" },
    { cardType: "actionCard", card: "recruit", owner: "enemy2" },
    { cardType: "actionCard", card: "move", owner: "player" },
    { cardType: "actionCard", card: "diplo", owner: "enemy3" },
  ],
};

export default initialTimeline;
