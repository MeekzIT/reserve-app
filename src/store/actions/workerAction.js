import axios from "axios";
import { keys } from "../../keys";
import { GET_WORKER, GET_WORKER_HOUR } from "../types";

export const getBoxWorker = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/worker`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: data,
      })
      .then((response) => {
        dispatch({
          type: GET_WORKER,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getWorkerHours = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/worker/hour`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: data,
      })
      .then((response) => {
        dispatch({
          type: GET_WORKER_HOUR,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
