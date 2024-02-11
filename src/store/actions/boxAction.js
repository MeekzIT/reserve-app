import axios from "axios";
import { keys } from "../../keys";
import {
  CHANGE_PAYMENT_STATUS,
  GET_ACTIVE_ORDERS,
  GET_BOX,
  GET_BOXES,
  GET_BOX_CARS,
  GET_BOX_IMAGES,
  GET_BOX_ITEMS,
  GET_BOX_MODES,
  SET_ORDER,
} from "../types";
import Swal from "sweetalert2";

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

export const getBoxItems = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/box/`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: data,
      })
      .then((response) => {
        dispatch({
          type: GET_BOX_ITEMS,
          payload: response.data.items,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getBoxModes = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/item/box-mode`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: data,
      })
      .then((response) => {
        dispatch({
          type: GET_BOX_MODES,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getBoxCars = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/item/box-type`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: data,
      })
      .then((response) => {
        dispatch({
          type: GET_BOX_CARS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getBoxImages = (data) => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/box/image`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
        params: data,
      })
      .then((response) => {
        dispatch({
          type: GET_BOX_IMAGES,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const setOrder = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/order`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then(function (response) {
        if (response.data.succes) {
          dispatch({
            type: SET_ORDER,
            payload: response.data.succes,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const changePaymentStatus = (data) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_PAYMENT_STATUS,
      payload: data,
    });
  };
};

export const getActiveOrders = () => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/activeOrders/reserves`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ACTIVE_ORDERS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const activateOrder = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/activeOrders/activate`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then(function (response) {
        if (response.data.succes) {
          Swal.fire({
            position: "center",
            iconColor: "#008491",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};
