import React from "react";
import { connect } from "react-redux";
import * as classes from "./Header.module.css";

import * as appUIactions from "../../store/actions/appUIactions";
import {
  MODE_PLAY,
  EASY_PUZZLE,
  MEDIUM_PUZZLE,
  HARD_PUZZLE,
} from "../../helpers/helpers";

import Button from "../../UI/Button/Button";

import PropTypes from "prop-types";

const Header = (props) => {
  let difficulty = "";

  if (props.difficulty === EASY_PUZZLE) {
    difficulty = "easy";
  } else if (props.difficulty === MEDIUM_PUZZLE) {
    difficulty = "semi-hard";
  } else if (props.difficulty === HARD_PUZZLE) {
    difficulty = "hard";
  }

  return (
    <div className={classes.Header}>
      <div className={classes.Row}>
        <h1 className={classes.GlowOnHover}>SUDOSOLVER</h1>
        <Button clicked={props.toggleIntroComponent}>↩︎ Back to menu</Button>
      </div>
      <div className={classes.Row}>
        <p className={classes.ModeDetails}>
          {props.currentMode === MODE_PLAY
            ? `Solve the ${difficulty} sudoku below!`
            : ""}
        </p>
        <Button inlineBtn clicked={props.toggleGameRules}>
          {props.showGameRules ? "Hide rules" : "Show rules"}
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    showGameRules: state.appUI.showGameRules,
    currentMode: state.sudoku.currentMode,
    difficulty: state.sudoku.difficulty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleIntroComponent: () => dispatch(appUIactions.toggleIntroComponent()),
    toggleGameRules: () => dispatch(appUIactions.toggleGameRules()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.propTypes = {
  showGameRules: PropTypes.bool,
  currentMode: PropTypes.string,
  difficulty: PropTypes.string,

  toggleIntroComponent: PropTypes.func,
  toggleGameRules: PropTypes.func,
};
