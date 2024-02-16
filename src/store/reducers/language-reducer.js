import { CHANGE_LANGUAGE, GET_COUNTRIES } from "../types";

const initialState = {
  lang: localStorage.getItem("language"),
  countries: null,
};

export const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        lang: action.payload,
      };
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    default:
      return state;
  }
};
