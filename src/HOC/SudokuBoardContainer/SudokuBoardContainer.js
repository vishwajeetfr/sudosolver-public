import React from "react";
import * as classes from "./SudokuBoardContainer.module.css";

const SudokuBoardContainer = (props) => {
  return <div className={classes.SudokuBoardContainer}>{props.children}</div>;
};
export default SudokuBoardContainer;
