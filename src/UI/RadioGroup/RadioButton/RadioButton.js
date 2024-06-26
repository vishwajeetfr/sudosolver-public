import React from "react";
import * as classes from "./RadioButton.module.css";

import PropTypes from "prop-types";

const RadioButton = (props) => {
  return (
    <div className={classes.RadioButton}>
      <label className={classes.RadioLabel} htmlFor={props.id}>
        {props.label}
      </label>
      <input
        className={classes.RadioInput}
        id={props.id}
        name={props.name}
        type="radio"
        onChange={props.checked}
      />
    </div>
  );
};
export default RadioButton;

RadioButton.propTypes = {
  label: PropTypes.any,
  id: PropTypes.any,
  name: PropTypes.any,
  checked: PropTypes.func,
};
