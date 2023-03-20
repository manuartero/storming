import { inferPlayerHandsFromGameContext } from "./infer-player-hands";

const timeline: Timeline = {
  current: undefined,
  next: [
    {
      cardType: "actionCard",
      action: "build",
      owner: "player",
      cardId: "player_build_1",
    },
    {
      cardType: "actionCard",
      action: "move",
      owner: "enemy1",
      cardId: "enemy1_move_1",
    },
    {
      cardType: "actionCard",
      action: "recruit",
      owner: "enemy2",
      cardId: "enemy2_recruit_1",
    },
    {
      cardType: "actionCard",
      action: "move",
      owner: "enemy3",
      cardId: "enemy3_move_2",
    },
  ],
  future: [
    {
      cardType: "actionCard",
      action: "move",
      owner: "player",
      cardId: "player_move_1",
    },
    {
      cardType: "actionCard",
      action: "move",
      owner: "enemy1",
      cardId: "enemy1_move_2",
    },
    {
      cardType: "actionCard",
      action: "diplo",
      owner: "enemy2",
      cardId: "enemy2_diplo_1",
    },
    {
      cardType: "actionCard",
      action: "build",
      owner: "enemy3",
      cardId: "enemy3_build_1",
    },
  ],
};

describe("inferPlayerHandsFromGameContext()", () => {
  it("returns card status grouped by player", () => {
    const got = inferPlayerHandsFromGameContext(timeline);

    const player = [
      {
        card: {
          cardType: "actionCard",
          action: "build",
          owner: "player",
          cardId: "player_build_1",
        },
        status: "played",
      },
      {
        card: {
          cardType: "actionCard",
          action: "move",
          owner: "player",
          cardId: "player_move_1",
        },
        status: "played",
      },
      {
        card: {
          cardType: "actionCard",
          action: "move",
          owner: "player",
          cardId: "player_move_2",
        },
        status: "available",
      },
      {
        card: {
          cardType: "actionCard",
          action: "recruit",
          owner: "player",
          cardId: "player_recruit_1",
        },
        status: "available",
      },
      {
        card: {
          cardType: "actionCard",
          action: "diplo",
          owner: "player",
          cardId: "player_diplo_1",
        },
        status: "available",
      },
    ];

    const enemy1 = [
      {
        card: {
          cardType: "actionCard",
          action: "build",
          owner: "enemy1",
          cardId: "enemy1_build_1",
        },
        status: "available",
      },
      {
        card: {
          cardType: "actionCard",
          action: "move",
          owner: "enemy1",
          cardId: "enemy1_move_1",
        },
        status: "played",
      },
      {
        card: {
          cardType: "actionCard",
          action: "move",
          owner: "enemy1",
          cardId: "enemy1_move_2",
        },
        status: "played",
      },
      {
        card: {
          cardType: "actionCard",
          action: "recruit",
          owner: "enemy1",
          cardId: "enemy1_recruit_1",
        },
        status: "available",
      },
      {
        card: {
          cardType: "actionCard",
          action: "diplo",
          owner: "enemy1",
          cardId: "enemy1_diplo_1",
        },
        status: "available",
      },
    ];

    const enemy2 = [
      {
        card: {
          cardType: "actionCard",
          action: "build",
          owner: "enemy2",
          cardId: "enemy2_build_1",
        },
        status: "available",
      },
      {
        card: {
          cardType: "actionCard",
          action: "move",
          owner: "enemy2",
          cardId: "enemy2_move_1",
        },
        status: "available",
      },
      {
        card: {
          cardType: "actionCard",
          action: "move",
          owner: "enemy2",
          cardId: "enemy2_move_2",
        },
        status: "available",
      },
      {
        card: {
          cardType: "actionCard",
          action: "recruit",
          owner: "enemy2",
          cardId: "enemy2_recruit_1",
        },
        status: "played",
      },
      {
        card: {
          cardType: "actionCard",
          action: "diplo",
          owner: "enemy2",
          cardId: "enemy2_diplo_1",
        },
        status: "played",
      },
    ];

    const enemy3 = [
      {
        card: {
          cardType: "actionCard",
          action: "build",
          owner: "enemy3",
          cardId: "enemy3_build_1",
        },
        status: "played",
      },
      {
        card: {
          cardType: "actionCard",
          action: "move",
          owner: "enemy3",
          cardId: "enemy3_move_1",
        },
        status: "available",
      },
      {
        card: {
          cardType: "actionCard",
          action: "move",
          owner: "enemy3",
          cardId: "enemy3_move_2",
        },
        status: "played",
      },
      {
        card: {
          cardType: "actionCard",
          action: "recruit",
          owner: "enemy3",
          cardId: "enemy3_recruit_1",
        },
        status: "available",
      },
      {
        card: {
          cardType: "actionCard",
          action: "diplo",
          owner: "enemy3",
          cardId: "enemy3_diplo_1",
        },
        status: "available",
      },
    ];

    expect(got).toEqual({ player, enemy1, enemy2, enemy3 });
  });
});
