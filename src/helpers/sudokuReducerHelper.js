import {
  generatePuzzleAndSolvedPuzzle,
  solvePuzzleFromUserInputtedPuzzle,
} from "../helpers/helpers";

export const defaultState = {
  sudokuState: [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ],
  solvedState: null,
  invalidNumbersArr: [],
  invalidRowsArr: [],
  invalidColumnsArr: [],
  invalidBoxesArr: [],
  invalidBoxesNumbersArr: [],
  // isAnyCellJustUpdated switches between "foo" and "bar" just to signal a change
  isAnyCellJustUpdated: "foo",
  defaultCellCoordinates: [
    // a coordinate is given as [row, column]
  ],
  isSudokuSolved: false,
  difficulty: null,
  doesUserInputtedPuzzleHaveError: false,
  isUserInputtedPuzzleSolvable: true,
  isUserInputtedPuzzleSolved: false,
  currentMode: null,
};

export const setGameMode = (action, state) => {
  return {
    ...state,
    currentMode: action.payload.mode,
    // Setting the rest to default - initting the game
    invalidNumbersArr: [],
    invalidRowsArr: [],
    invalidColumnsArr: [],
    invalidBoxesArr: [],
    invalidBoxesNumbersArr: [],
    isAnyCellJustUpdated: "foo",
    isSudokuSolved: false,
    difficulty: state.difficulty,
    doesUserInputtedPuzzleHaveError: false,
    isUserInputtedPuzzleSolvable: true,
    isUserInputtedPuzzleSolved: false,
  };
};

export const setDifficulty = (action, state) => {
  const difficulty = action.payload.difficulty;
  return {
    ...state,
    difficulty: difficulty,
  };
};

export const setPuzzleAndSolvedPuzzle = (action, state) => {
  const generatedPuzzleAndSolvedPuzzle = generatePuzzleAndSolvedPuzzle(
    state.difficulty
  );
  const generatedPuzzle = generatedPuzzleAndSolvedPuzzle.puzzle;
  const generatedSolvedPuzzle = generatedPuzzleAndSolvedPuzzle.solvedPuzzle;

  const defaultCellCoords = [];
  generatedPuzzle.forEach((outer_el, outer_idx, outer_arr) => {
    outer_el.forEach((inner_el, inner_idx, inner_arr) => {
      // console.log(inner_el);

      if (inner_el === null) return;
      const row = outer_idx + 1;
      const column = inner_idx + 1;
      defaultCellCoords.push([row, column]);
    });
  });

  return {
    ...state,
    sudokuState: generatedPuzzle,
    solvedState: generatedSolvedPuzzle,
    defaultCellCoordinates: defaultCellCoords,
    invalidRowsArr: [],
    invalidColumnsArr: [],
    invalidNumbersArr: [],
    isSudokuSolved: false,
  };
};

export const solvePuzzle = (action, state) => {
  //   if (state.solvedState === null) alert("No solved state available");

  const allCellCoords = [];
  state.solvedState.forEach((outer_el, outer_idx, outer_arr) => {
    outer_el.forEach((inner_el, inner_idx, inner_arr) => {
      // console.log(inner_el);

      if (inner_el === null) return;
      const row = outer_idx + 1;
      const column = inner_idx + 1;
      allCellCoords.push([row, column]);
    });
  });

  return {
    ...state,
    sudokuState: state.solvedState,
    invalidRowsArr: [],
    invalidColumnsArr: [],
    invalidNumbersArr: [],
    isSudokuSolved: true,
    defaultCellCoordinates: allCellCoords,
  };
};

export const setSudokuState = (action, state) => {
  const newState = state.sudokuState.map((el, i) => {
    if (i === action.payload.row - 1) {
      const newRow = el.map((el, i) => {
        if (i === action.payload.column - 1) {
          // console.log("Yayyyy");
          return action.payload.value;
        } else return el;
      });
      // console.log(newRow);
      return newRow;
    } else return el;
  });

  return {
    ...state,
    sudokuState: newState,
    isAnyCellJustUpdated: state.isAnyCellJustUpdated === "foo" ? "bar" : "foo",
  };
};

export const setInvalidCells = (action, state) => {
  const newInvalidNumbers = [...action.payload.invalidNumbersArr];
  return {
    ...state,
    invalidNumbersArr: newInvalidNumbers,
    // doesUserInputtedPuzzleHaveError: true,
  };
};

export const setInvalidRows = (action, state) => {
  return {
    ...state,
    invalidRowsArr: [...action.payload.invalidRows],
    isSudokuSolved: false,
  };
};

export const setInvalidColumns = (action, state) => {
  return {
    ...state,
    invalidColumnsArr: [...action.payload.invalidColumns],
    isSudokuSolved: false,
  };
};

export const sudokuIsSolved = (action, state) => {
  return {
    ...state,
    isSudokuSolved: true,
  };
};

export const setInvalidBoesAndNumbers = (action, state) => {
  const invalidBoxes = action.payload.invalidBoxesArr;
  const invalidNumbers = action.payload.invalidNumbersArr;

  return {
    ...state,
    invalidBoxesArr: invalidBoxes,
    invalidBoxesNumbersArr: invalidNumbers,
  };
};

export const solveSudokuForUser = (action, state) => {
  const isInvalidNumbersArrEmpty = state.invalidNumbersArr.length === 0;
  const isInvalidRowsArrEmpty = state.invalidRowsArr.length === 0;
  const isInvalidColumnsArrEmpty = state.invalidColumnsArr.length === 0;
  const isInvalidBoxesArrEmpty = state.invalidBoxesArr.length === 0;
  const isInvalidBoxesNumbersArrEmpty =
    state.invalidBoxesNumbersArr.length === 0;

  const noErrors =
    isInvalidNumbersArrEmpty &&
    isInvalidRowsArrEmpty &&
    isInvalidColumnsArrEmpty &&
    isInvalidBoxesArrEmpty &&
    isInvalidBoxesNumbersArrEmpty;

  const attemptedSolvedState = solvePuzzleFromUserInputtedPuzzle(
    state.sudokuState
  );

  if (!noErrors) {
    return {
      ...state,
      doesUserInputtedPuzzleHaveError: true,
      isUserInputtedPuzzleSolvable: false,
      isUserInputtedPuzzleSolved: false,
    };
  } else if (attemptedSolvedState === null) {
    console.log("Not solvable");

    return {
      ...state,
      isUserInputtedPuzzleSolvable: false,
      isUserInputtedPuzzleSolved: false,
      doesUserInputtedPuzzleHaveError: false,
    };
  } else {
    // console.log("Solved");
    const allCellCoordsArr = [];
    attemptedSolvedState.forEach((outer_el, outer_idx, outer_arr) => {
      outer_el.forEach((inner_el, inner_idx, inner_arr) => {
        // console.log(inner_el);

        if (inner_el === null) return;
        const row = outer_idx + 1;
        const column = inner_idx + 1;
        allCellCoordsArr.push([row, column]);
      });
    });

    return {
      ...state,
      sudokuState: attemptedSolvedState,
      isUserInputtedPuzzleSolvable: true,
      isUserInputtedPuzzleSolved: true,
      isSudokuSolved: true,
      defaultCellCoordinates: allCellCoordsArr,
      doesUserInputtedPuzzleHaveError: false,
    };
  }
};

export const initUserInputSUdokuToSolve = (action, state) => {
  const defaultSudokuState = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ];
  return {
    ...state,
    sudokuState: defaultSudokuState,
    defaultCellCoordinates: [],
    isSudokuSolved: false,
  };
};
