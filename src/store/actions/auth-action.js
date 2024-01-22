import axios from "axios";
import { keys } from "../../keys";
import { LOGIN_ACTION, SET_AUTH } from "../types";
import { HOME_PAGE, LOGIN_PAGE } from "../../routing/pats";
import Swal from "sweetalert2";

export const loginAction = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/users/sign-in`, data)
      .then(function (response) {
        if (response.data.succes) {
          dispatch({
            type: LOGIN_ACTION,
            payload: {
              isAuth: true,
              data: response.data.data,
              isSuper: response.data.data.role,
            },
          });
          localStorage.setItem("isAuth", JSON.stringify(true));
          localStorage.setItem(
            "token",
            JSON.stringify(response.data.data.token)
          );
          window.location.href = HOME_PAGE;
        } else
          Swal.fire({
            position: "center",
            iconColor: "#008491",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
            title: "Неправильные Данные",
          });
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const registerAction = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/users/sign-up`, data)
      .then(function (response) {
        if (response.data.succes) {
          window.location.href = LOGIN_PAGE;
        } else
          Swal.fire({
            position: "center",
            iconColor: "#008491",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
            title: "Неправильные Данные",
          });
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const setAuthAction = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_AUTH, payload: data });
  };
};

export const logoutAction = () => {
  return (dispatch) => {
    axios
      .post(
        `${keys.api}/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${keys.token}`,
          },
        }
      )
      .then(function (response) {
        localStorage.removeItem("isAuth");
        localStorage.removeItem("token");
        localStorage.clear();
        window.location.href = "/";
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const getMe = () => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/auth/me`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: LOGIN_ACTION,
          payload: {
            isAuth: true,
            data: response.data.data,
            isSuper: response.data.data.role,
          },
        });
        localStorage.setItem("isAuth", JSON.stringify(true));
        localStorage.setItem(
          "isSuper",
          JSON.stringify(response.data.data.role)
        );
        localStorage.setItem("token", JSON.stringify(response.data.data.token));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
