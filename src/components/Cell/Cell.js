import React from "react";
import * as classes from "./Cell.module.css";

import PropTypes from "prop-types";

const Cell = (props) => {
  const cellClasses = [classes.Cell];
  let tabIndex = "0";

  if (props.isDefault) {
    cellClasses.push(classes.Default);
    tabIndex = "";
  }
  if (props.isInvalid) {
    cellClasses.push(classes.Invalid);
  }

  if (props.active) {
    cellClasses.push(classes.Active);
  }

  const onFocusHandler = () => {
    props.cellFocusHandler(props.row, props.column);
  };

  return (
    <div
      tabIndex={tabIndex}
      onFocus={onFocusHandler}
      className={cellClasses.join(" ")}
    >
      {props.value}
    </div>
  );
};
export default Cell;

Cell.propTypes = {
  isDefault: PropTypes.bool,
  isInvalid: PropTypes.bool,
  row: PropTypes.number,
  column: PropTypes.number,
  active: PropTypes.bool,
};
