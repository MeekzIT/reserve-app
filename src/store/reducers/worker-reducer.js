import { GET_WORKER, GET_WORKER_HOUR } from "../types";

const initialState = {
  workers: null,
  hours: null,
};

export const workerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WORKER:
      return {
        ...state,
        workers: action.payload,
      };
    case GET_WORKER_HOUR:
      return {
        ...state,
        hours: action.payload,
      };
    default:
      return state;
  }
};
