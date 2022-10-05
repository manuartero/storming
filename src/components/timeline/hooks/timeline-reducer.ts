function timelineReducer(
  state: TimelineState,
  action: TimelineAction
): TimelineState {
  console.debug(`timelineReducer(${action.type})`);

  switch (action.type) {
    case "prepare": {
      return {
        ...state,
      };
    }
    case "next": {
      return {
        ...state,
      };
    }
  }
  throw Error("Unknown action: " + action.type);
}

export default timelineReducer;
