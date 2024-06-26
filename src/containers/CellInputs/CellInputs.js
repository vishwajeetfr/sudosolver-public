import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as classes from "./CellInputs.module.css";
import CellInput from "../../components/CellInput/CellInput";
import * as sudokuActions from "../../store/actions/sudokuActions";
import PropTypes from "prop-types";

const availableInputs = ["C", 1, 2, 3, 4, 5, 6, 7, 8, 9];

const CellInputs = ({ activeCell, setSudokuState }) => {
  useEffect(() => {
    const keyDownHandler = (event) => {
      let key = event.key;

      const supportedInputs = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "Backspace",
      ];
      if (!supportedInputs.includes(key)) return;

      let bindingValue = key === "Backspace" ? null : +key;
      cellInputClickedHandler(bindingValue);
    };

    const cellInputClickedHandler = (value) => {
      const { row, column } = activeCell;
      setSudokuState(row, column, value);
    };

    document.body.addEventListener("keydown", keyDownHandler);

    return () => {
      document.body.removeEventListener("keydown", keyDownHandler);
    };
  }, [activeCell, setSudokuState]);

  const cellInputClickedHandler = (value) => {
    const { row, column } = activeCell;
    setSudokuState(row, column, value);
  };

  return (
    <div className={classes.CellInputs}>
      {availableInputs.map((el, i) => (
        <CellInput
          key={i}
          value={el}
          cellInputClickedHandler={cellInputClickedHandler}
          isClear={el === "C"}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeCell: state.appUI.activeCell,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSudokuState: (row, column, value) =>
      dispatch(sudokuActions.setSudokuState(row, column, value)),
  };
};

CellInputs.propTypes = {
  activeCell: PropTypes.object,
  setSudokuState: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(CellInputs);
