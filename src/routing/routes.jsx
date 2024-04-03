import React from "react"
import History from "../pages/history/History"
import HomePage from "../pages/home/Home"
import LoginPage from "../pages/login/Login"
import Order from "../pages/order/Order"
import RegisterPage from "../pages/register/Register"
import Result from "../pages/result/Result"
import Settings from "../pages/settings/Settings"
import Suport from "../pages/suport/Suport"
import {
	HISTORY_PAGE,
	HOME_PAGE,
	LOGIN_PAGE,
	ORDER_PAGE,
	PAYMENT_RESULT,
	REGISTER_PAGE,
	SETTIGS_PAGE,
	SUPORT_PAGE,
} from "./pats"

export const isAuthPages = [
	{ id: 1, path: HOME_PAGE, Component: <HomePage /> },
	{ id: 2, path: SETTIGS_PAGE, Component: <Settings /> },
	{ id: 3, path: SUPORT_PAGE, Component: <Suport /> },
	{ id: 4, path: HISTORY_PAGE, Component: <History /> },
	{ id: 5, path: ORDER_PAGE, Component: <Order /> },
	{ id: 6, path: PAYMENT_RESULT, Component: <Result /> },
]

export const notAuthPages = [
	{ id: 1, path: LOGIN_PAGE, Component: LoginPage },
	{ id: 2, path: REGISTER_PAGE, Component: RegisterPage },
]
