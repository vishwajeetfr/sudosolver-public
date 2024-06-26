import "./App.css";
import Sudoku from "./containers/Sudoku/Sudoku";
import CellInputs from "./containers/CellInputs/CellInputs";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import appUIreducer from "./store/reducers/appUIreducer";
import sudokuReducer from "./store/reducers/sudokuReducer";

import Layout from "./HOC/Layout/Layout";
import SudokuBoardContainer from "./HOC/SudokuBoardContainer/SudokuBoardContainer";
import IntroPage from "./containers/IntroPage/IntroPage";
import Header from "./containers/Header/Header";
import Controls from "./containers/Controls/Controls";
import React from "react";

const store = createStore(
  combineReducers({
    appUI: appUIreducer,
    sudoku: sudokuReducer,
  })
);

function App() {
  return (
    <Provider store={store} style={{}}>
      <Layout>
        <IntroPage />
        <Header />
        <SudokuBoardContainer>
          <Sudoku />
          <CellInputs />
        </SudokuBoardContainer>
        <Controls />
      </Layout>
    </Provider>
  );
}

export default App;
