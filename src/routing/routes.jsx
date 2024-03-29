import React from "react";
import {
  HISTORY_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  ORDER_PAGE,
  REGISTER_PAGE,
  SETTIGS_PAGE,
  SUPORT_PAGE,
} from "./pats";
import HomePage from "../pages/home/Home";
import LoginPage from "../pages/login/Login";
import Settings from "../pages/settings/Settings";
import RegisterPage from "../pages/register/Register";
import Suport from "../pages/suport/Suport";
import History from "../pages/history/History";
import Order from "../pages/order/Order";

export const isAuthPages = [
  { id: 1, path: HOME_PAGE, Component: <HomePage /> },
  { id: 2, path: SETTIGS_PAGE, Component: <Settings /> },
  { id: 3, path: SUPORT_PAGE, Component: <Suport /> },
  { id: 4, path: HISTORY_PAGE, Component: <History /> },
  { id: 5, path: ORDER_PAGE, Component: <Order /> },
];

export const notAuthPages = [
  { id: 1, path: LOGIN_PAGE, Component: LoginPage },
  { id: 2, path: REGISTER_PAGE, Component: RegisterPage },
];
