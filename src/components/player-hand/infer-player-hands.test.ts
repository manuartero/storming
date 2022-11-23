import { inferPlayerHandsFromGameContext } from "./infer-player-hands";

const timeline: Timeline = {
  current: undefined,
  next: [
    {
      cardType: "actionCard",
      action: "build",
      owner: "player",
      cardId: "player_build_A",
    },
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
      owner: "enemy3",
      cardId: "enemy3_move_B",
    },
  ],
  future: [
    {
      cardType: "actionCard",
      action: "move",
      owner: "player",
      cardId: "player_move_A",
    },
    {
      cardType: "actionCard",
      action: "move",
      owner: "enemy1",
      cardId: "enemy1_move_B",
    },
    {
      cardType: "actionCard",
      action: "diplo",
      owner: "enemy2",
      cardId: "enemy2_diplo_A",
    },
    {
      cardType: "actionCard",
      action: "build",
      owner: "enemy3",
      cardId: "enemy3_build_A",
    },
  ],
};

describe("inferPlayerHandsFromGameContext()", () => {
  it("returns card status grouped by player", () => {
    const got = inferPlayerHandsFromGameContext(timeline);
    expect(got).toEqual({
      player: [
        {
          card: {
            cardType: "actionCard",
            action: "build",
            owner: "player",
            cardId: "player_build_A",
          },
          status: "played",
        },
        {
          card: {
            cardType: "actionCard",
            action: "move",
            owner: "player",
            cardId: "player_move_A",
          },
          status: "played",
        },
        {
          card: {
            cardType: "actionCard",
            action: "move",
            owner: "player",
            cardId: "player_move_B",
          },
          status: "available",
        },
        {
          card: {
            cardType: "actionCard",
            action: "recruit",
            owner: "player",
            cardId: "player_recruit_A",
          },
          status: "available",
        },
        {
          card: {
            cardType: "actionCard",
            action: "diplo",
            owner: "player",
            cardId: "player_diplo_A",
          },
          status: "available",
        },
      ],
      enemy1: [
        {
          card: {
            cardType: "actionCard",
            action: "build",
            owner: "enemy1",
            cardId: "enemy1_build_A",
          },
          status: "available",
        },
        {
          card: {
            cardType: "actionCard",
            action: "move",
            owner: "enemy1",
            cardId: "enemy1_move_A",
          },
          status: "played",
        },
        {
          card: {
            cardType: "actionCard",
            action: "move",
            owner: "enemy1",
            cardId: "enemy1_move_B",
          },
          status: "played",
        },
        {
          card: {
            cardType: "actionCard",
            action: "recruit",
            owner: "enemy1",
            cardId: "enemy1_recruit_A",
          },
          status: "available",
        },
        {
          card: {
            cardType: "actionCard",
            action: "diplo",
            owner: "enemy1",
            cardId: "enemy1_diplo_A",
          },
          status: "available",
        },
      ],
      enemy2: [
        {
          card: {
            cardType: "actionCard",
            action: "build",
            owner: "enemy2",
            cardId: "enemy2_build_A",
          },
          status: "available",
        },
        {
          card: {
            cardType: "actionCard",
            action: "move",
            owner: "enemy2",
            cardId: "enemy2_move_A",
          },
          status: "available",
        },
        {
          card: {
            cardType: "actionCard",
            action: "move",
            owner: "enemy2",
            cardId: "enemy2_move_B",
          },
          status: "available",
        },
        {
          card: {
            cardType: "actionCard",
            action: "recruit",
            owner: "enemy2",
            cardId: "enemy2_recruit_A",
          },
          status: "played",
        },
        {
          card: {
            cardType: "actionCard",
            action: "diplo",
            owner: "enemy2",
            cardId: "enemy2_diplo_A",
          },
          status: "played",
        },
      ],
      enemy3: [
        {
          card: {
            cardType: "actionCard",
            action: "build",
            owner: "enemy3",
            cardId: "enemy3_build_A",
          },
          status: "played",
        },
        {
          card: {
            cardType: "actionCard",
            action: "move",
            owner: "enemy3",
            cardId: "enemy3_move_A",
          },
          status: "available",
        },
        {
          card: {
            cardType: "actionCard",
            action: "move",
            owner: "enemy3",
            cardId: "enemy3_move_B",
          },
          status: "played",
        },
        {
          card: {
            cardType: "actionCard",
            action: "recruit",
            owner: "enemy3",
            cardId: "enemy3_recruit_A",
          },
          status: "available",
        },
        {
          card: {
            cardType: "actionCard",
            action: "diplo",
            owner: "enemy3",
            cardId: "enemy3_diplo_A",
          },
          status: "available",
        },
      ],
    });
  });
});
