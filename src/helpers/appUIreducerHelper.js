export const setActiveCellState = (action, state) => {
  return {
    ...state,
    activeCell: { row: action.payload.row, column: action.payload.column },
  };
};

export const clearActiveCell = (action, state) => {
  return {
    ...state,
    activeCell: {
      row: null,
      column: null,
    },
  };
};

export const toggleIntroComponent = (action, state) => {
  return {
    ...state,
    showIntroComponent: !state.showIntroComponent,
    activeCell: {
      row: null,
      column: null,
    },
  };
};

export const toggleGameRules = (action, state) => {
  return {
    ...state,
    showGameRules: !state.showGameRules,
  };
};
