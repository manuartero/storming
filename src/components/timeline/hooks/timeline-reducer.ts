function timelineReducer(
  state: TimelineState,
  action: TimelineAction
): TimelineState {
  console.debug(`timelineReducer(${action.type})`);

  switch (action.type) {
    case "planification": {
      // action.card

      return {
        ...state,
      };
    }

    case "resolve": {
      /* double validation (strict mode) */
      if (action.card !== state.next[0]) {
        return { ...state };
      }
      state.current = state.next[0];
      state.next = state.next.slice(1);
      return {
        ...state,
      };
    }
  }
}

export default timelineReducer;
