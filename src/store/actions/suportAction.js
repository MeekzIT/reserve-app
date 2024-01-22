import axios from "axios";
import { keys } from "../../keys";
import Swal from "sweetalert2";

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
