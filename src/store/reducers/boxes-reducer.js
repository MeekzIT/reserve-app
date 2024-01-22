import { GET_BOX, GET_BOXES } from "../types";

const initialState = {
  boxes: null,
  box: null,
};

export const boxesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOXES:
      return { ...state, boxes: action.payload };
    case GET_BOX:
      return { ...state, box: action.payload[0] };
    default:
      return state;
  }
};
