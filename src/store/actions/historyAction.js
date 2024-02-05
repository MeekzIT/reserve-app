import axios from "axios";
import { keys } from "../../keys";
import { GET_HISTORY, GET_SINGLE_HISTORY } from "../types";

export const getHistory = () => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/order/user-orders`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_HISTORY,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getSingleHistory = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/order/user-order`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: data,
      })
      .then((response) => {
        dispatch({
          type: GET_SINGLE_HISTORY,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
