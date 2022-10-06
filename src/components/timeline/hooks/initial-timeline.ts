const initialTimeline: TimelineState = {
  current: undefined,
  next: [
    // example
    { cardType: "actionCard", action: "build", owner: "enemy1" },
    { cardType: "actionCard", action: "move", owner: "enemy2" },
    { cardType: "actionCard", action: "build", owner: "player" },
    { cardType: "actionCard", action: "recruit", owner: "enemy3" },
    { cardType: "actionCard", action: "move", owner: "enemy1" },
    { cardType: "actionCard", action: "recruit", owner: "enemy2" },
    { cardType: "actionCard", action: "move", owner: "player" },
    { cardType: "actionCard", action: "diplo", owner: "enemy3" },
  ],
  future: [
    // example
    { cardType: "actionCard", action: "move", owner: "enemy1" },
    { cardType: "actionCard", action: "recruit", owner: "enemy2" },
    { cardType: "actionCard", action: "move", owner: "player" },
    { cardType: "actionCard", action: "diplo", owner: "enemy3" },
  ],
};

export default initialTimeline;
