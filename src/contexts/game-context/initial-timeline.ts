// example

const initialTimeline: Timeline = {
  current: undefined,
  next: [
    { cardType: "actionCard", action: "build", owner: "enemy1" },
    { cardType: "actionCard", action: "move", owner: "enemy2" },
    { cardType: "actionCard", action: "build", owner: "player" },
    { cardType: "actionCard", action: "move", owner: "enemy3" },
  ],
  future: [
    { cardType: "actionCard", action: "move", owner: "enemy1" },
    { cardType: "actionCard", action: "recruit", owner: "enemy2" },
    { cardType: "actionCard", action: "move", owner: "player" },
    { cardType: "actionCard", action: "diplo", owner: "enemy3" },
  ],
};

export default initialTimeline;
