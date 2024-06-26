# Welcome to SUDOSOLVER

### SUDOSOLVER is a sudoku web app that generates random sudoku and solves any valid 9x9 sudoku using backtracing algorithm

### The demo app is hosted [Here](https://mysudosolver.netlify.app/)

## State management

- All vital state, both the Sudoku state and UI state are managed by Redux

## Folder structure

- **Assets:** all images, videos and graphics go here
- **Components:** contains all presentational component, that don't dispatch actions to the Redux store
- **Containers:** contains components that dispatch actions to the redux and feed children components with props
- **Helpers:** contains functions and variable. Basically for outsouring logics, variables and making the Redux reducers lean
- **HOC:** Higher order components go in here

- **Store:**

  - **Store > actions:** contains the action types
  - **Store > reducers:** contains the reducers

- **UI:** contains all custom UI elements e.g. buttons, radio buttons etc.
