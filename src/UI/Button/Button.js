import React from "react";
import * as classes from "./Button.module.css";

import PropTypes from "prop-types";

const Button = (props) => {
  const styleClasses = [classes.Button];

  if (props.inlineBtn) {
    styleClasses.push(classes.Inline);
  }

  return (
    <button
      className={styleClasses.join(" ")}
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
export default Button;

Button.propTypes = {
  inlineBtn: PropTypes.any,
  clicked: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.any,
};
