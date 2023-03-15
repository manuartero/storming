// example

const initialTimeline: Timeline = {
  current: undefined,
  next: [
    {
      cardType: "actionCard",
      action: "build",
      owner: "enemy1",
      cardId: "enemy1_build_A",
    },
    {
      cardType: "actionCard",
      action: "move",
      owner: "enemy2",
      cardId: "enemy2_move_A",
    },
    {
      cardType: "actionCard",
      action: "build",
      owner: "player",
      cardId: "player_build_A",
    },
    {
      cardType: "actionCard",
      action: "move",
      owner: "enemy3",
      cardId: "enemy3_move_A",
    },
  ],
  future: [
    {
      cardType: "actionCard",
      action: "move",
      owner: "enemy1",
      cardId: "enemy1_move_A",
    },
    {
      cardType: "actionCard",
      action: "recruit",
      owner: "enemy2",
      cardId: "enemy2_recruit_A",
    },
    {
      cardType: "actionCard",
      action: "move",
      owner: "player",
      cardId: "player_move_A",
    },
    {
      cardType: "actionCard",
      action: "diplo",
      owner: "enemy3",
      cardId: "enemy3_diplo_A",
    },
  ],
};

export default initialTimeline;
