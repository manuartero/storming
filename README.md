```js
timelineState {
  current: {
    cardType: 'actionCard',
    action: 'move',
    owner: 'player'
  },
  next: [{}],
  future: [{}]
}

dispatchTimelineAction({ type: 'planification', card })
dispatchTimelineAction({ type: 'resolve', card })
```

```js
boardState {
  "-2,-3": {
    status: 'idle',
    terrain: 'field',
    piece: {
        type: 'soldier',
        owner: 'player',
      }
    building: {
      type: 'town',
      owner: 'player'
    },
  },
  "-1,-3": {}
  ...
}

dispatchBoardAction({ type: 'select-tile', tile })
dispatchBoardAction({ type: 'highlight-tiles', tiles })
dispatchBoardAction({ type: 'move-piece', from, to })
dispatchBoardAction({ type: 'build-in-tile', tile })
```

```js
gameContext {
  phase: 'action',
  activePlayer: 'enemy2',
  activeCard: {
    cardType: 'actionCard',
    action: 'recruit',
    owner: 'enemy2'
  }
}

gameContext.changePhase() { ... }
gameContext.setActivePlayer(player) { ... }
gameContext.serActiveCard(card) { ... }
```
