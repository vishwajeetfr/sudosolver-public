import * as actions from "../actions/actionTypes";

export const setActivateCell = (payload) => {
  return {
    type: actions.ACTIVATE_CELL,
    payload: payload,
  };
};

export const setSudokuState = (row, column, value) => {
  return {
    type: actions.SET_SUDOKU_STATE,
    payload: { row: row, column: column, value: value },
  };
};

export const setInvalidCells = (invalidNumbersArr) => {
  return {
    type: actions.SET_INVALID_CELLS,
    payload: {
      invalidNumbersArr: invalidNumbersArr,
    },
  };
};

export const setInvalidRows = (invalidRows) => {
  return {
    type: actions.SET_INVALID_ROWS,
    payload: {
      invalidRows: invalidRows,
    },
  };
};

export const setInvalidColumns = (invalidColumns) => {
  return {
    type: actions.SET_INVALID_COLUMNS,
    payload: {
      invalidColumns: invalidColumns,
    },
  };
};

export const setPuzzleAndSolvedPuzzle = () => {
  return {
    type: actions.SET_PUZZLE_AND_SOLVED_PUZZLE,
  };
};

export const solvePuzzle = () => {
  return {
    type: actions.SOLVE_PUZZLE,
  };
};

export const sudokuIsSolved = () => {
  return {
    type: actions.SUDOKU_IS_SOLVED,
  };
};

export const setInvalidBoxesAndNumbers = (
  invalidBoxesArr,
  invalidNumbersArr
) => {
  return {
    type: actions.SET_INVALID_BOXES_AND_NUMBERS,
    payload: {
      invalidBoxesArr: invalidBoxesArr,
      invalidNumbersArr: invalidNumbersArr,
    },
  };
};

export const solvePuzzleForUser = () => {
  return {
    type: actions.SOLVE_SUDOKU_FOR_USER,
  };
};

export const initUserInputSUdokuToSolve = () => {
  return {
    type: actions.INIT_USER_INPUT_SUDOKU_TO_SOLVE,
  };
};

export const setGameMode = (mode) => {
  return {
    type: actions.SET_GAME_MODE,
    payload: {
      mode: mode,
    },
  };
};

export const setDifficulty = (difficulty) => {
  return {
    type: actions.SET_DIFFICULTY,
    payload: {
      difficulty: difficulty,
    },
  };
};
