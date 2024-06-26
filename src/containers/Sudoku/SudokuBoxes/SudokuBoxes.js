import React, { useEffect } from "react";
import { connect } from "react-redux";
import SudokuBox from "./SudokuBox/SudokuBox";
import arrayDuplicated from "array-duplicated";
import * as classes from "./SudokuBoxes.module.css";
import * as sudokuActions from "../../../store/actions/sudokuActions";

import PropTypes from "prop-types";

const SudokuBoxes = (props) => {
  useEffect(() => {
    detectInvalidBox();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.sudokuState]);

  let boxesWithRepeatedNumbers = [];
  const invalidNumbersInBox = [];

  const detectInvalidBox = () => {
    const s = props.sudokuState;
    const box1 = [
      ...s[0].slice(0, 3),
      ...s[1].slice(0, 3),
      ...s[2].slice(0, 3),
    ];
    const box2 = [
      ...s[0].slice(3, 6),
      ...s[1].slice(3, 6),
      ...s[2].slice(3, 6),
    ];
    const box3 = [
      ...s[0].slice(6, 9),
      ...s[1].slice(6, 9),
      ...s[2].slice(6, 9),
    ];
    const box4 = [
      ...s[3].slice(0, 3),
      ...s[4].slice(0, 3),
      ...s[5].slice(0, 3),
    ];
    const box5 = [
      ...s[3].slice(3, 6),
      ...s[4].slice(3, 6),
      ...s[5].slice(3, 6),
    ];
    const box6 = [
      ...s[3].slice(6, 9),
      ...s[4].slice(6, 9),
      ...s[5].slice(6, 9),
    ];
    const box7 = [
      ...s[6].slice(0, 3),
      ...s[7].slice(0, 3),
      ...s[8].slice(0, 3),
    ];
    const box8 = [
      ...s[6].slice(3, 6),
      ...s[7].slice(3, 6),
      ...s[8].slice(3, 6),
    ];
    const box9 = [
      ...s[6].slice(6, 9),
      ...s[7].slice(6, 9),
      ...s[8].slice(6, 9),
    ];
    const boxesWithRepeatedNumbersInner = [];
    const boxesArr = [box1, box2, box3, box4, box5, box6, box7, box8, box9];
    boxesArr.forEach((el, idx) => {
      const elArr = el;
      const elArrWithoutNull = [];

      elArr.forEach((el, i) => {
        if (!(el === null)) {
          elArrWithoutNull.push(el);
        }
      });

      const duplicates = arrayDuplicated(elArrWithoutNull);
      duplicates.forEach((el, idx) => {
        if (el && !invalidNumbersInBox.includes(el))
          invalidNumbersInBox.push(el);
      });

      if (duplicates.length > 0) {
        boxesWithRepeatedNumbersInner.push(idx + 1);
      }
    });
    boxesWithRepeatedNumbers = [...boxesWithRepeatedNumbersInner];
    props.setInvalidBoxesAndNumbers(
      boxesWithRepeatedNumbers,
      invalidNumbersInBox
    );
  };

  const content = new Array(9)
    .fill("0")
    .map((el, idx) => <SudokuBox key={idx} />);

  const styleClasses = [classes.SudokuBoxes];
  if (props.isSudokuSolved) {
    styleClasses.push(classes.Solved);
  }

  return <div className={styleClasses.join(" ")}>{content}</div>;
};

const mapStateToProps = (state) => {
  return {
    sudokuState: state.sudoku.sudokuState,
    isSudokuSolved: state.sudoku.isSudokuSolved,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInvalidBoxesAndNumbers: (invalidBoxesArr, invalidNumbersArr) =>
      dispatch(
        sudokuActions.setInvalidBoxesAndNumbers(
          invalidBoxesArr,
          invalidNumbersArr
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SudokuBoxes);

SudokuBoxes.propTypes = {
  sudokuState: PropTypes.array,
  isSudokuSolved: PropTypes.bool,
  setInvalidBoxesAndNumbers: PropTypes.func,
};
