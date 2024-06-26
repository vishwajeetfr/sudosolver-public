import * as actions from "../actions/actionTypes";
import * as sudokuReducerHelper from "../../helpers/sudokuReducerHelper";

const dafaultState = sudokuReducerHelper.defaultState;

const reducer = (state = dafaultState, action) => {
  switch (action.type) {
    case actions.SET_GAME_MODE:
      const newStateSetNewGame = sudokuReducerHelper.setGameMode(action, state);
      return newStateSetNewGame;

    case actions.SET_DIFFICULTY:
      const newStateSetDifficulty = sudokuReducerHelper.setDifficulty(
        action,
        state
      );
      return newStateSetDifficulty;

    case actions.SET_PUZZLE_AND_SOLVED_PUZZLE:
      const newStateSetPuzzleAndSolvedPuzzle =
        sudokuReducerHelper.setPuzzleAndSolvedPuzzle(action, state);
      return newStateSetPuzzleAndSolvedPuzzle;

    case actions.SOLVE_PUZZLE:
      const newStateSolvePuzzle = sudokuReducerHelper.solvePuzzle(
        action,
        state
      );
      return newStateSolvePuzzle;

    case actions.SET_SUDOKU_STATE:
      const newStateSetSudokuState = sudokuReducerHelper.setSudokuState(
        action,
        state
      );
      return newStateSetSudokuState;

    case actions.SET_INVALID_CELLS:
      const newStateSetInvalidCells = sudokuReducerHelper.setInvalidCells(
        action,
        state
      );
      return newStateSetInvalidCells;

    case actions.SET_INVALID_ROWS:
      const newStateSetInvalidRows = sudokuReducerHelper.setInvalidRows(
        action,
        state
      );
      return newStateSetInvalidRows;

    case actions.SET_INVALID_COLUMNS:
      const newStateSetInvalidColumns = sudokuReducerHelper.setInvalidColumns(
        action,
        state
      );
      return newStateSetInvalidColumns;

    case actions.SUDOKU_IS_SOLVED:
      const newStateSudokuIsSolved = sudokuReducerHelper.sudokuIsSolved(
        action,
        state
      );
      return newStateSudokuIsSolved;

    case actions.SET_INVALID_BOXES_AND_NUMBERS:
      const newStateSetInvalidBoxesAndNumbers =
        sudokuReducerHelper.setInvalidBoesAndNumbers(action, state);
      return newStateSetInvalidBoxesAndNumbers;

    case actions.SOLVE_SUDOKU_FOR_USER:
      const newStateSolveSudokuForUser = sudokuReducerHelper.solveSudokuForUser(
        action,
        state
      );
      return newStateSolveSudokuForUser;

    case actions.INIT_USER_INPUT_SUDOKU_TO_SOLVE:
      const newStateInitUserInputSudokuToSolve =
        sudokuReducerHelper.initUserInputSUdokuToSolve(action, state);
      return newStateInitUserInputSudokuToSolve;

    default:
      return state;
  }
};

export default reducer;
