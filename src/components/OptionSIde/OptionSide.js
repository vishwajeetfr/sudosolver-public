import React from "react";
import * as classes from "./OptionSide.module.css";
import Button from "../../UI/Button/Button";

import PropTypes from "prop-types";

const OptionSide = (props) => {
  return (
    <div className={classes.OptionSide}>
      <h3>{props.heading}</h3>
      <div className={classes.OptionDetails}>
        <p>{props.details}</p>
        {props.children}
      </div>

      <Button disabled={props.btnDisabledCondition} clicked={props.btnCTA}>
        {props.btnLabel}
      </Button>
    </div>
  );
};

export default OptionSide;

OptionSide.propTypes = {
  heading: PropTypes.string,
  details: PropTypes.string,
  children: PropTypes.any,
  btnCTA: PropTypes.func,
  btnLabel: PropTypes.string,
};
