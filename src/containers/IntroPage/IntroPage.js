import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as classes from "./IntroPage.module.css";
import * as sudokuActions from "../../store/actions/sudokuActions";
import * as appUIactions from "../../store/actions/appUIactions";
import { MODE_PLAY, MODE_SOLVE } from "../../helpers/helpers";

import OptionSide from "../../components/OptionSIde/OptionSide";
import RadioGroup from "../../UI/RadioGroup/RadioGroup";

import { EASY_PUZZLE, MEDIUM_PUZZLE, HARD_PUZZLE } from "../../helpers/helpers";

import PropTypes from "prop-types";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const IntroPage = (props) => {
  const styleClasses = [classes.IntroPage];
  const navigate = useNavigate(); // Move useNavigate inside the component
  const [user, setUser] = useState(null); // State to hold user data

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []); // Fetch user data from localStorage on component mount

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login"); // Now use navigate inside handleLogout
    } catch (error) {
      console.error(error);
    }
  };

  if (!props.shouldShowIntroComponent) {
    styleClasses.push(classes.Hidden);
  }

  const setEasyDifficulty = () => {
    props.setDifficulty(EASY_PUZZLE);
  };

  const setMediumDifficulty = () => {
    props.setDifficulty(MEDIUM_PUZZLE);
  };
  const setHardDifficulty = () => {
    props.setDifficulty(HARD_PUZZLE);
  };

  const difficultyBtns = [
    { radioLabel: "Easy", radioAction: setEasyDifficulty },
    { radioLabel: "Medium", radioAction: setMediumDifficulty },
    { radioLabel: "Hard", radioAction: setHardDifficulty },
  ];

  return (
    <div className={styleClasses.join(" ")}>
      <header>
        <h1>sudosolver</h1>
      </header>
      <div className={classes.Heading}>
        <h3 className={classes.HeadingInfo}>
          Select a game mode below to get started
        </h3>
      </div>
      <div className={classes.Options}>
        <OptionSide
          heading="Play Sudoku"
          details="GENERATE A RANDOM SUDOKU"
          btnLabel="Play now"
          btnDisabledCondition={!props.difficulty}
          btnCTA={props.setPuzzleAndSolvedPuzzle}
        >
          <RadioGroup
            radioGroupTitle="Select a difficulty level:"
            radioBtns={difficultyBtns}
            radioGroupName="difficulty button"
          />
        </OptionSide>

        <OptionSide
          heading="Solve my Sudoku"
          details="GOT A SUDOKU TO SOLVE?"
          btnLabel="Solve now"
          btnDisabledCondition={null}
          btnCTA={props.setBoardToEmpty}
        />
      </div>
      <footer>
        <>
          {user && user.email} <button onClick={handleLogout}>Logout</button>
        </>
      </footer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    difficulty: state.sudoku.difficulty,
    shouldShowIntroComponent: state.appUI.showIntroComponent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDifficulty: (difficulty) => {
      dispatch(sudokuActions.setDifficulty(difficulty));
    },
    setPuzzleAndSolvedPuzzle: () => {
      dispatch(sudokuActions.setPuzzleAndSolvedPuzzle());
      dispatch(sudokuActions.setGameMode(MODE_PLAY));
      dispatch(appUIactions.toggleIntroComponent());
    },
    setBoardToEmpty: () => {
      dispatch(sudokuActions.initUserInputSUdokuToSolve());
      dispatch(sudokuActions.setGameMode(MODE_SOLVE));
      dispatch(appUIactions.toggleIntroComponent());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IntroPage);

IntroPage.propTypes = {
  difficulty: PropTypes.string,
  shouldShowIntroComponent: PropTypes.bool,

  setDifficulty: PropTypes.func,
  setPuzzleAndSolvedPuzzle: PropTypes.func,
  setBoardToEmpty: PropTypes.func,
};
