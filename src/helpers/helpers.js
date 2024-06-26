import { makepuzzle, solvepuzzle } from "sudoku";

export const MODE_PLAY = "MODE_PLAY";
export const MODE_SOLVE = "MODE_SOLVE";

export const EASY_PUZZLE = "EASY_PUZZLE";
export const MEDIUM_PUZZLE = "MEDIUM_PUZZLE";
export const HARD_PUZZLE = "HARD_PUZZLE";

export const generateBoxNumber = (row, column) => {
  let boxNumber = [];
  const coord = { row: +row, column: +column };

  if ([1, 2, 3].includes(coord.row) && [1, 2, 3].includes(coord.column)) {
    boxNumber = 1;
  } else if (
    [1, 2, 3].includes(coord.row) &&
    [4, 5, 6].includes(coord.column)
  ) {
    boxNumber = 2;
  } else if (
    [1, 2, 3].includes(coord.row) &&
    [7, 8, 9].includes(coord.column)
  ) {
    boxNumber = 3;
  } else if (
    [4, 5, 6].includes(coord.row) &&
    [1, 2, 3].includes(coord.column)
  ) {
    boxNumber = 4;
  } else if (
    [4, 5, 6].includes(coord.row) &&
    [4, 5, 6].includes(coord.column)
  ) {
    boxNumber = 5;
  } else if (
    [4, 5, 6].includes(coord.row) &&
    [7, 8, 9].includes(coord.column)
  ) {
    boxNumber = 6;
  } else if (
    [7, 8, 9].includes(coord.row) &&
    [1, 2, 3].includes(coord.column)
  ) {
    boxNumber = 7;
  } else if (
    [7, 8, 9].includes(coord.row) &&
    [4, 5, 6].includes(coord.column)
  ) {
    boxNumber = 8;
  } else if (
    [7, 8, 9].includes(coord.row) &&
    [7, 8, 9].includes(coord.column)
  ) {
    boxNumber = 9;
  } else boxNumber = null;

  return boxNumber;
};

export const generatePuzzleAndSolvedPuzzle = (difficulty) => {
  const puzzle = makepuzzle();

  // The correct puzzle
  const correctPuzzle = puzzle.map((el) => {
    // The sudoku solver package denotes "9" as "0"
    if (el === 0) {
      return 9;
    } else return el;
  });

  const solvedPuzzle = solvepuzzle(puzzle);

  // The correct solved puzzle
  const correctSolvedPuzzle = solvedPuzzle.map((el) => {
    // The sudoku solver package denotes "9" as "0"
    if (el === 0) {
      return 9;
    } else return el;
  });

  // Logics for difficulty
  ///////////////////////////

  // Gets filled indices in puzzle
  const emptyIndices = correctPuzzle
    .map((el, idx) => {
      if (el == null) {
        return { index: idx };
      } else return { index: "empty" };
    })
    .filter((el) => el.index !== "empty");

  /*
  Filling more cells based on difficulty
      Easy - only 10 cells are empty
      Medium - only 25 cells are empty
      Hard- only 40 cells are empty
  */

  let numberOfBoxesToRemainEmpty = 0;
  if (difficulty === EASY_PUZZLE) {
    numberOfBoxesToRemainEmpty = 10;
  } else if (difficulty === MEDIUM_PUZZLE) {
    numberOfBoxesToRemainEmpty = 30;
  } else if (difficulty === HARD_PUZZLE) {
    numberOfBoxesToRemainEmpty = 50;
  } else {
    // Just go easy
    numberOfBoxesToRemainEmpty = 10;
  }

  const correctPuzzleWithDifficulty = correctPuzzle;

  const emptyIndicesInitialLength = emptyIndices.length;

  for (
    let counter = 0;
    counter < emptyIndicesInitialLength - numberOfBoxesToRemainEmpty;
    counter++
  ) {
    // Get random cells of the empty cells
    const emptyIndicesLength = emptyIndices.length;
    const rnd = Math.floor(Math.random() * emptyIndicesLength);

    let currElIndex = emptyIndices[rnd].index;
    emptyIndices.splice(rnd, 1);
    correctPuzzleWithDifficulty[currElIndex] = correctSolvedPuzzle[currElIndex];
  }

  const formattedCorrectPuzzleWithDifficulty = [
    [...correctPuzzleWithDifficulty.slice(0, 9)],
    [...correctPuzzleWithDifficulty.slice(9, 18)],
    [...correctPuzzleWithDifficulty.slice(18, 27)],
    [...correctPuzzleWithDifficulty.slice(27, 36)],
    [...correctPuzzleWithDifficulty.slice(36, 45)],
    [...correctPuzzleWithDifficulty.slice(45, 54)],
    [...correctPuzzleWithDifficulty.slice(54, 63)],
    [...correctPuzzleWithDifficulty.slice(63, 72)],
    [...correctPuzzleWithDifficulty.slice(72, 81)],
  ];

  const formattedSolvedPuzzle = [
    [...correctSolvedPuzzle.slice(0, 9)],
    [...correctSolvedPuzzle.slice(9, 18)],
    [...correctSolvedPuzzle.slice(18, 27)],
    [...correctSolvedPuzzle.slice(27, 36)],
    [...correctSolvedPuzzle.slice(36, 45)],
    [...correctSolvedPuzzle.slice(45, 54)],
    [...correctSolvedPuzzle.slice(54, 63)],
    [...correctSolvedPuzzle.slice(63, 72)],
    [...correctSolvedPuzzle.slice(72, 81)],
  ];

  return {
    puzzle: formattedCorrectPuzzleWithDifficulty,
    solvedPuzzle: formattedSolvedPuzzle,
  };
};

export const solvePuzzleFromUserInputtedPuzzle = (userPuzzle) => {
  const flatUserPuzzle = userPuzzle.flat();

  const puzzleSetForSolving = flatUserPuzzle.map((el) => {
    // The sudoku solver package denotes "9" as "0"
    if (el === 9) {
      return 0;
    } else return el;
  });

  const solvedPuzzle = solvepuzzle(puzzleSetForSolving);

  if (solvedPuzzle === null) {
    return null;
  } else {
    // The correct solved puzzle
    const correctSolvedPuzzle = solvedPuzzle.map((el) => {
      // The sudoku solver package denotes "9" as "0"
      if (el === 0) {
        return 9;
      } else return el;
    });

    const formattedSolvedPuzzle = [
      [...correctSolvedPuzzle.slice(0, 9)],
      [...correctSolvedPuzzle.slice(9, 18)],
      [...correctSolvedPuzzle.slice(18, 27)],
      [...correctSolvedPuzzle.slice(27, 36)],
      [...correctSolvedPuzzle.slice(36, 45)],
      [...correctSolvedPuzzle.slice(45, 54)],
      [...correctSolvedPuzzle.slice(54, 63)],
      [...correctSolvedPuzzle.slice(63, 72)],
      [...correctSolvedPuzzle.slice(72, 81)],
    ];

    // Returns the solved puzzle if if solved it, else it returns null
    return formattedSolvedPuzzle;
  }
};
