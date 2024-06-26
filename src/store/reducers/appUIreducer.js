import * as actions from "../actions/actionTypes";
import * as appUIreducerHelper from "../../helpers/appUIreducerHelper";

const store = {
  isAnyCellActive: false,
  activeCell: {
    row: null,
    column: null,
  },
  showIntroComponent: true,
  showGameRules: false,
};

const reducer = (state = store, action) => {
  switch (action.type) {
    case actions.SET_ACTIVE_CELL_STATE:
      const newStateSetActiveCellState = appUIreducerHelper.setActiveCellState(
        action,
        state
      );
      return newStateSetActiveCellState;

    case actions.CLEAR_ACTIVE_CELL:
      const newStateClearActiveCell = appUIreducerHelper.clearActiveCell(
        action,
        state
      );
      return newStateClearActiveCell;

    case actions.TOGGLE_INTRO_COMPONENT:
      const newStateToggleIntroComponent =
        appUIreducerHelper.toggleIntroComponent(action, state);
      return newStateToggleIntroComponent;

    case actions.TOGLE_GAME_RULES:
      const newStateToggleGameRules = appUIreducerHelper.toggleGameRules(
        action,
        state
      );
      return newStateToggleGameRules;
    default:
      return state;
  }
};

export default reducer;
