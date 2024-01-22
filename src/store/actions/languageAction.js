import axios from "axios";
import { CHANGE_LANGUAGE, GET_COUNTRIES } from "../types";
import { keys } from "../../keys";

export const changeLanguage = (lang) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_LANGUAGE, payload: lang });
  };
};

export const getCountries = () => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/country`)
      .then((response) => {
        dispatch({
          type: GET_COUNTRIES,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
