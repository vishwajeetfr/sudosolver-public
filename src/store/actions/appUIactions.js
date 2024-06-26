import * as actions from "./actionTypes";

export const setACtiveCellState = (row, column) => {
  return {
    type: actions.SET_ACTIVE_CELL_STATE,
    payload: { row: row, column: column },
  };
};

export const toggleIntroComponent = () => {
  return {
    type: actions.TOGGLE_INTRO_COMPONENT,
  };
};

export const clearActiveCell = () => {
  return {
    type: actions.CLEAR_ACTIVE_CELL,
  };
};

export const toggleGameRules = () => {
  return {
    type: actions.TOGLE_GAME_RULES,
  };
};
