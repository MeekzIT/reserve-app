import HomePage from "../pages/home/Home";
import { HOME_PAGE, LOGIN_PAGE, SETTIGS_PAGE } from "./pats";
import LoginPage from "../pages/login/Login";
import Settings from "../pages/settings/Settings";

export const isAuthPages = [
  { id: 1, path: HOME_PAGE, Component: <HomePage /> },
  { id: 7, path: SETTIGS_PAGE, Component: <Settings /> },
];

export const notAuthPages = [{ id: 2, path: LOGIN_PAGE, Component: LoginPage }];
