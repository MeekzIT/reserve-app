import { GET_ANSWERS } from "../types";

const initialState = {
  answers: null,
};

export const suportReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ANSWERS:
      return {
        ...state,
        answers: action.payload,
      };
    default:
      return state;
  }
};
