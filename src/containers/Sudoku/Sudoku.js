import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as classes from "./Sudoku.module.css";
import Cell from "../../components/Cell/Cell";
import * as sudokuActions from "../../store/actions/sudokuActions";
import * as appUIactions from "../../store/actions/appUIactions";
import SudokuBoxes from "./SudokuBoxes/SudokuBoxes";
import * as helpers from "../../helpers/helpers";
import Feedback from "../../components/Feedback/Feedback";
import GameRules from "../../components/GameRules/GameRules";

import PropTypes from "prop-types";

const Sudoku = (props) => {
  useEffect(() => {
    checkForRepeatedNumbersInRowsAndColumns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isAnyCellJustUpdated]);

  useEffect(() => {
    setShowFeedbackComp(
      props.isSudokuSolved || props.doesUserInputtedPuzzleHaveError
    );
  }, [props.isSudokuSolved, props.doesUserInputtedPuzzleHaveError]);

  const [showFeedbackComp, setShowFeedbackComp] = useState(false);

  const generateRepeatedNumbersInRows = (state) => {
    let repeatedNumbersArr = [];
    let repeatedNumbersRows = [];
    state.forEach((row, index) => {
      const allNumberCounter = [
        { val: 1, count: 0 },
        { val: 2, count: 0 },
        { val: 3, count: 0 },
        { val: 4, count: 0 },
        { val: 5, count: 0 },
        { val: 6, count: 0 },
        { val: 7, count: 0 },
        { val: 8, count: 0 },
        { val: 9, count: 0 },
      ];

      row.forEach((cell, i) => {
        // Guard class
        if (cell === null) return;
        const currentIndex = allNumberCounter.findIndex(
          (el) => el.val === cell
        );

        if (currentIndex !== -1) {
          const newCounterEl = {
            val: cell,
            count: allNumberCounter[currentIndex].count + 1,
          };
          allNumberCounter[currentIndex] = newCounterEl;
        }
      });
      const repeatNums = [];

      const repeatedNumbersObj = allNumberCounter.filter((el) => el.count > 1);
      for (const num in repeatedNumbersObj) {
        const repeatedNum = repeatedNumbersObj[num].val;

        repeatNums.push(repeatedNum);
        repeatedNumbersRows.push(index + 1);
      }

      repeatedNumbersArr = repeatedNumbersArr.concat(repeatNums);
    });

    props.setInvalidRows(repeatedNumbersRows);
    return repeatedNumbersArr;
  };

  const generateRepeatedNumbersInColumns = (state) => {
    let repeatedNumbersArr = [];
    let repeatedNumbersColumns = [];
    const transformedState = state.map((outer_el, outer_i, mainArr) => {
      const columnFromRow = [];
      outer_el.forEach((_, inner_i) => {
        const newEl = mainArr[inner_i][outer_i];
        columnFromRow.push(newEl);
      });
      return columnFromRow;
    });

    transformedState.forEach((row, index) => {
      const allNumberCounter = [
        { val: 1, count: 0 },
        { val: 2, count: 0 },
        { val: 3, count: 0 },
        { val: 4, count: 0 },
        { val: 5, count: 0 },
        { val: 6, count: 0 },
        { val: 7, count: 0 },
        { val: 8, count: 0 },
        { val: 9, count: 0 },
      ];

      row.forEach((cell, i) => {
        // Guard class
        if (cell === null) return;
        const currentIndex = allNumberCounter.findIndex(
          (el) => el.val === cell
        );

        if (currentIndex !== -1) {
          const newCounterEl = {
            val: cell,
            count: allNumberCounter[currentIndex].count + 1,
          };
          allNumberCounter[currentIndex] = newCounterEl;
        }
      });
      const repeatNums = [];

      const repeatedNumbersObj = allNumberCounter.filter((el) => el.count > 1);
      for (const num in repeatedNumbersObj) {
        const repeatedNum = repeatedNumbersObj[num].val;
        repeatedNumbersColumns.push(index + 1);
        repeatNums.push(repeatedNum);
      }

      repeatedNumbersArr = repeatedNumbersArr.concat(repeatNums);
    });
    // console.log(repeatedNumbersArr);
    // console.log(repeatedNumbersColumns);
    props.setInvalidColumns(repeatedNumbersColumns);
    return repeatedNumbersArr;
  };

  const checkForRepeatedNumbersInRowsAndColumns = () => {
    const repeatedNumbersInRows = generateRepeatedNumbersInRows(
      props.sudokuState
    );
    const repeatedNumbersInColumns = generateRepeatedNumbersInColumns(
      props.sudokuState
    );
    const repeatedNumbers = [
      ...new Set([...repeatedNumbersInRows, ...repeatedNumbersInColumns]),
    ];

    // Checks if sudoku is solved
    checkIfSudokuIsSolved(
      repeatedNumbersInRows,
      repeatedNumbersInColumns,
      repeatedNumbers
    );

    props.setInvalidNumbers(repeatedNumbers);
  };

  const cellFocusHandler = (row, column) => {
    props.setActivateCellState(row, column);
  };

  const checkIfSudokuIsSolved = (
    invalidRows,
    invalidColumns,
    invalidNumbers
  ) => {
    const sudokuState = [...props.sudokuState];
    // converting 2-D array to 1-D
    const flatSudokuState = sudokuState.flat();

    const isAllCellsCompletelyFilled = !flatSudokuState.includes(null);

    const isThereNoInvalidRow = !Boolean(invalidRows.length);
    const isThereNoInvalidColumn = !Boolean(invalidColumns.length);
    const isThereNoInvalidNumber = !Boolean(invalidNumbers.length);

    const isSudokuSolved =
      isAllCellsCompletelyFilled &&
      isThereNoInvalidRow &&
      isThereNoInvalidColumn &&
      isThereNoInvalidNumber;

    if (isSudokuSolved) {
      props.setSudokuStateToSolved();
    }
  };

  const styleClasses = [classes.Sudoku];

  if (props.isSudokuSolved) {
    styleClasses.push(classes.Solved);
  }

  const hideFeedbackComp = () => {
    setShowFeedbackComp(false);
  };

  return (
    <div className={styleClasses.join(" ")}>
      <GameRules show={props.showGameRules} />
      <SudokuBoxes />

      {/* Sudoku logic */}
      <div className={classes.Content}>
        {props.sudokuState.flat().map((el, i) => {
          const row = Math.floor(i / 9) + 1;
          const column = (i + 1) % 9 === 0 ? 9 : (i + 1) % 9;
          const boxNumber = helpers.generateBoxNumber(row, column);

          const isInvalidInRowOrColumn =
            props.invalidNumbersArr.includes(el) &&
            (props.invalidRows.includes(row) ||
              props.invalidColumns.includes(column));
          const isInvalidInBox =
            props.invalidBoxesArr.includes(boxNumber) &&
            props.invalidBoxesNumbersArr.includes(el);

          return (
            <Cell
              key={i}
              value={el}
              cellFocusHandler={cellFocusHandler}
              row={row}
              column={column}
              isInvalid={isInvalidInRowOrColumn || isInvalidInBox}
              isDefault={props.defaultCellCoordinates.some(
                (el) => el[0] === row && el[1] === column
              )}
              active={
                row === props.activeCell.row &&
                column === props.activeCell.column
              }
            />
          );
        })}
      </div>
      {showFeedbackComp ? (
        <Feedback
          show={true}
          type={props.isSudokuSolved ? "success" : "danger"}
          message={
            props.isSudokuSolved
              ? "Solved"
              : "That's not solvable. Valid Sudoku don't contain error. Fix errors and try again"
          }
          unmountMe={hideFeedbackComp}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // app UI reducer
    showGameRules: state.appUI.showGameRules,
    activeCell: state.appUI.activeCell,

    // sudoku reducer
    sudokuState: state.sudoku.sudokuState,
    invalidNumbersArr: state.sudoku.invalidNumbersArr,
    isAnyCellJustUpdated: state.sudoku.isAnyCellJustUpdated,
    invalidRows: state.sudoku.invalidRowsArr,
    invalidColumns: state.sudoku.invalidColumnsArr,
    invalidBoxesArr: state.sudoku.invalidBoxesArr,
    invalidBoxesNumbersArr: state.sudoku.invalidBoxesNumbersArr,
    allValuesAreDefault: state.sudoku.allValuesAreDefault,
    defaultCellCoordinates: state.sudoku.defaultCellCoordinates,
    isSudokuSolved: state.sudoku.isSudokuSolved,

    doesUserInputtedPuzzleHaveError:
      state.sudoku.doesUserInputtedPuzzleHaveError,
    isUserInputtedPuzzleSolvable: state.sudoku.isUserInputtedPuzzleSolvable,
    isUserInputtedPuzzleSolved: state.sudoku.isUserInputtedPuzzleSolved,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActivateCellState: (row, column) =>
      dispatch(appUIactions.setACtiveCellState(row, column)),
    setInvalidNumbers: (invalidNumbersArr) =>
      dispatch(sudokuActions.setInvalidCells(invalidNumbersArr)),
    setInvalidRows: (invalidRows) =>
      dispatch(sudokuActions.setInvalidRows(invalidRows)),
    setInvalidColumns: (invalidColumns) =>
      dispatch(sudokuActions.setInvalidColumns(invalidColumns)),
    setSudokuStateToSolved: () => dispatch(sudokuActions.sudokuIsSolved()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sudoku);

Cell.propTypes = {
  showGameRules: PropTypes.bool,
  activeCell: PropTypes.object,

  // sudoku reducer
  sudokuState: PropTypes.array,
  invalidNumbersArr: PropTypes.array,
  isAnyCellJustUpdated: PropTypes.any,
  invalidRows: PropTypes.array,
  invalidColumns: PropTypes.array,
  invalidBoxesArr: PropTypes.array,
  invalidBoxesNumbersArr: PropTypes.array,
  allValuesAreDefault: PropTypes.bool,
  defaultCellCoordinates: PropTypes.array,
  isSudokuSolved: PropTypes.bool,
  doesUserInputtedPuzzleHaveError: PropTypes.bool,
  isUserInputtedPuzzleSolvable: PropTypes.bool,
  isUserInputtedPuzzleSolved: PropTypes.bool,

  setActivateCellState: PropTypes.func,
  setInvalidNumbers: PropTypes.func,
  setInvalidRows: PropTypes.func,
  setInvalidColumns: PropTypes.func,
  setSudokuStateToSolved: PropTypes.func,
};
