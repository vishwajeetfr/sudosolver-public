import React, { useEffect } from "react";
import * as classes from "./Feedback.module.css";

import PropTypes from "prop-types";

const Feedback = ({ unmountMe, show, type, message }) => {
  useEffect(() => {
    const unmountTimeout = setTimeout(() => {
      unmountMe();
    }, 2000);

    return () => clearTimeout(unmountTimeout);
  }, [unmountMe]); // Include unmountMe in the dependency array

  let styleClasses = [classes.Feedback];

  if (show) {
    styleClasses.push(classes.Visible);
  }

  if (type === "success") {
    styleClasses.push(classes.Success);
  } else if (type === "danger") {
    styleClasses.push(classes.Danger);
  }

  return (
    <div className={styleClasses.join(" ")}>
      <p>{message}</p>
    </div>
  );
};

export default Feedback;

Feedback.propTypes = {
  unmountMe: PropTypes.func,
  show: PropTypes.bool,
  type: PropTypes.string,
  message: PropTypes.string,
};
