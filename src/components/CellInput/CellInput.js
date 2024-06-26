import React from "react";
import * as classes from "./CellInput.module.css";
import PropTypes from "prop-types";

const CellInput = (props) => {
  const cellInputClasses = [classes.CellInput];
  if (props.isClear) cellInputClasses.push(classes.ClearCell);

  const onClickHandler = () => {
    if (props.isClear) {
      props.cellInputClickedHandler(null);
      return;
    }
    props.cellInputClickedHandler(+props.value);
  };

  return (
    <div className={cellInputClasses.join(" ")} onClick={onClickHandler}>
      <p className={classes.Value}>{props.value}</p>
    </div>
  );
};
export default CellInput;

CellInput.propTypes = {
  isClear: PropTypes.bool,
  cellInputClickedHandler: PropTypes.func,
  value: PropTypes.any,
};
