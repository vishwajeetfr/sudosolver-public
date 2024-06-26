import React from "react";
import * as classes from "./GameRules.module.css";

import PropTypes from "prop-types";

const GameRules = (props) => {
  const styleClasses = [classes.GameRules];

  if (props.show) {
    styleClasses.push(classes.Visible);
  }

  return (
    <div className={styleClasses.join(" ")}>
      <h3>Rules of the game</h3>
      <ul className={classes.List}>
        <li>
          Each row must contain the numbers from 1 to 9, without repetitions
        </li>
        <li>
          Each column must contain the numbers from 1 to 9, without repetitions
        </li>
        <li>The digits can only occur once per block</li>
      </ul>
      <h3>Tips</h3>
      <ul className={classes.List}>
        <li> Don’t Repeat Any Numbers</li>
        <li>Don't guess, keep scanning till you see an opportunity</li>
        <li>
          Use the process of elimination (start with rows, columns or blocks
          that are almost completely filled)
        </li>
        <li>
          Complete beginner?{" "}
          <a
            rel="noreferrer"
            target="_blank"
            href="https://sudoku.com/how-to-play/sudoku-rules-for-complete-beginners/"
          >
            Learn Sudoku here
          </a>
        </li>
      </ul>
    </div>
  );
};
export default GameRules;

GameRules.propTypes = {
  show: PropTypes.bool,
};
