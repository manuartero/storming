# Storming

## `useGameContext()`

```js
gameContext {
  phase: 'action',
  board: {
    "-2,-3": {
      terrain: 'field',
      piece: { type: 'soldier', owner: 'player' }
      building: { type: 'town', owner: 'player' }
    },
    "-1,-3": { ... },
    "0,-3": { ... },
    ...
  },
  timeline {
    current: {
      cardType: 'actionCard',
      action: 'move',
      owner: 'enemy1',
      cardId: 'enemy1_move_A'
    },
    next: [
      { ... }
    ],
    future: [
      { ... }
    ]
  },
  players: [
    {
      player: 'enemy1',
      points: 3,
      gretestEmpirePoint: false,
    },
    { ... }
  ],
  activePlayer: 'enemy1',
  activeCard: { // timeline.current
      cardType: 'actionCard',
      action: 'move',
      owner: 'enemy1',
      cardId: 'enemy1_move_A'
  },

  build(buildAction){ },
  move(moveAction) { },
  recruit(recruitAction) { },
  plan(planAction) { },
  firstPlayer(player) { },
  skip() { },
  loadSavegame(gameContext) { },
}

```
