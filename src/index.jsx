import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import i18n from "i18next";
import i18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import i18nextHttpBackend from "i18next-http-backend";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/index";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { initReactI18next } from "react-i18next";

import "./index.css";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";

const theme = createTheme({
  palette: {
    primary: {
      main: "#008491",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

i18n
  .use(initReactI18next)
  .use(i18nextBrowserLanguageDetector)
  .use(i18nextHttpBackend)
  .init({
    supportedLngs: ["ru", "en", "am", "ge", "az"],
    fallbackLng: "ru",
    detection: {
      order: ["cookie"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/translation/{{lng}}/translation.json",
    },
  });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ScrollToTop />
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
