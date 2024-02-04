import {
  GET_BOX,
  GET_BOXES,
  GET_BOX_CARS,
  GET_BOX_ITEMS,
  GET_BOX_MODES,
  SET_ORDER,
} from "../types";

const initialState = {
  boxes: null,
  box: null,
  items: null,
  boxCars: null,
  boxModes: null,
  orderSucces: false,
};

export const boxesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOXES:
      return { ...state, boxes: action.payload };
    case GET_BOX:
      return { ...state, box: action.payload[0] };
    case GET_BOX_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case GET_BOX_CARS:
      return {
        ...state,
        boxCars: action.payload,
      };
    case GET_BOX_MODES:
      return {
        ...state,
        boxModes: action.payload,
      };
    case SET_ORDER:
      return {
        ...state,
        orderSucces: action.payload,
      };
    default:
      return state;
  }
};
