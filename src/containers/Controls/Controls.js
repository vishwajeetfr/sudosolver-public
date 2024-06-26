import React from "react";
import { connect } from "react-redux";
import * as classes from "./Controls.module.css";
import { MODE_PLAY, MODE_SOLVE } from "../../helpers/helpers";

import * as sudokuActions from "../../store/actions/sudokuActions";
import * as appUIActions from "../../store/actions/appUIactions";
import Button from "../../UI/Button/Button";

import PropTypes from "prop-types";

const Controls = (props) => {
  let actionBasedOnMode;
  let controls;
  if (props.currentMode === MODE_PLAY) {
    actionBasedOnMode = props.solvePuzzle;
    controls = (
      <>
        <Button clicked={actionBasedOnMode} disabled={props.isSudokuSolved}>
          Give up
        </Button>
        <Button clicked={props.setPuzzleAndSolvedPuzzle}>New game</Button>
      </>
    );
  } else if (props.currentMode === MODE_SOLVE) {
    actionBasedOnMode = props.solvePuzzleForUser;
    controls = (
      <>
        <Button clicked={props.setBoardToEmpty}>Clear All</Button>
        <Button clicked={actionBasedOnMode} disabled={props.isSudokuSolved}>
          Solve
        </Button>
      </>
    );
  }

  return <div className={classes.Controls}>{controls}</div>;
};

const mapStateToProps = (state) => {
  return {
    currentMode: state.sudoku.currentMode,
    isThereSolvedState: state.sudoku.isUserInputtedPuzzleSolvable,
    doesUserInputtedPuzzleHaveError:
      state.sudoku.doesUserInputtedPuzzleHaveError,
    isSudokuSolved: state.sudoku.isSudokuSolved,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPuzzleAndSolvedPuzzle: () => {
      dispatch(appUIActions.clearActiveCell());
      dispatch(sudokuActions.setPuzzleAndSolvedPuzzle());
    },
    setBoardToEmpty: () => {
      dispatch(appUIActions.clearActiveCell());
      dispatch(sudokuActions.initUserInputSUdokuToSolve());
    },
    solvePuzzle: () => {
      dispatch(appUIActions.clearActiveCell());
      dispatch(sudokuActions.solvePuzzle());
    },
    solvePuzzleForUser: () => {
      dispatch(appUIActions.clearActiveCell());
      dispatch(sudokuActions.solvePuzzleForUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);

Controls.propTypes = {
  currentMode: PropTypes.string,
  isThereSolvedState: PropTypes.bool,
  doesUserInputtedPuzzleHaveError: PropTypes.bool,
  isSudokuSolved: PropTypes.bool,

  setPuzzleAndSolvedPuzzle: PropTypes.func,
  setBoardToEmpty: PropTypes.func,
  solvePuzzle: PropTypes.func,
  solvePuzzleForUser: PropTypes.func,
};
