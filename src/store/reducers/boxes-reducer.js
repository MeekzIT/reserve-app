import {
  GET_BOX,
  GET_BOXES,
  GET_BOX_ITEMS,
  GET_ITEMS_CARS,
  GET_ITEMS_MODES,
} from "../types";

const initialState = {
  boxes: null,
  box: null,
  items: null,
  itemCars: null,
  itemModes: null,
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
    case GET_ITEMS_CARS:
      return {
        ...state,
        itemCars: action.payload,
      };
    case GET_ITEMS_MODES:
      return {
        ...state,
        itemModes: action.payload,
      };
    default:
      return state;
  }
};
