import React from "react";
import * as classes from "./RadioGroup.module.css";

import RadioButton from "./RadioButton/RadioButton";

import PropTypes from "prop-types";

const RadioGroup = (props) => {
  const radioBtns = props.radioBtns;

  return (
    <div className={classes.RadioGroup}>
      <p className={classes.RadioGroupTitle}>{props.radioGroupTitle}</p>
      <div className={classes.BtnContainer}>
        {radioBtns.map((el, i) => (
          <RadioButton
            key={i}
            label={el.radioLabel}
            checked={el.radioAction}
            id={i}
            name={props.radioGroupName}
          />
        ))}
      </div>
    </div>
  );
};
export default RadioGroup;

RadioGroup.propTypes = {
  radioBtns: PropTypes.array,
  radioGroupTitle: PropTypes.string,
  radioGroupName: PropTypes.any,
};
