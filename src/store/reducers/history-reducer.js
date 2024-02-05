import {
  GET_BOX,
  GET_BOXES,
  GET_BOX_CARS,
  GET_BOX_ITEMS,
  GET_BOX_MODES,
  GET_HISTORY,
  GET_SINGLE_HISTORY,
  SET_ORDER,
} from "../types";

const initialState = {
  history: null,
  single: null,
};

export const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HISTORY:
      return {
        ...state,
        history: action.payload,
      };
    case GET_SINGLE_HISTORY:
      return {
        ...state,
        single: action.payload,
      };
    default:
      return state;
  }
};
