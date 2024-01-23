import axios from "axios";
import { keys } from "../../keys";
import Swal from "sweetalert2";
import { GET_ANSWERS } from "../types";

export const sendQuestion = (data, text) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/suport`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        if (response.data.succes) {
          Swal.fire({
            position: "center",
            iconColor: "#008491",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            title: text,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getAnswers = () => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/suport`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ANSWERS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
