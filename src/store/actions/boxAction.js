import axios from "axios";
import { keys } from "../../keys";
import { GET_BOX, GET_BOXES } from "../types";

export const getBoxes = () => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/box/boxes`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_BOXES,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getBox = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/box/boxes`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: data,
      })
      .then((response) => {
        dispatch({
          type: GET_BOX,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
