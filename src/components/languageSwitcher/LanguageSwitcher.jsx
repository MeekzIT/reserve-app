import { useEffect, useState } from "react";
import i18next from "i18next";
import cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../store/actions/languageAction";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getMe } from "../../store/actions/auth-action";

export function LanguageSwitcher() {
  const languages = [
    {
      id: 1,
      langEn: "ru",
    },
    {
      id: 2,
      langEn: "en",
    },
    // {
    //   id: 3,
    //   langEn: "am",
    // },
    {
      id: 4,
      langEn: "ge",
    },
    // {
    //   id: 5,
    //   langEn: "az",
    // },
  ];
  const dispatch = useDispatch();
  const currentLang = cookies.get("i18next");
  const [activeLang, setActiveLang] = useState(currentLang);
  const data = useSelector((state) => state.auth.admin);

  useEffect(() => {
    dispatch(getMe());
  }, []);

  const selectLange = (e) => {
    i18next.changeLanguage(e.target.value);
    localStorage.setItem("language", e.target.value);
    setActiveLang(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <FormControl size="small">
      <Select
        value={activeLang}
        onChange={selectLange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        {data
          ? data?.Country?.short == "AZ"
            ? [
                ...languages,
                {
                  id: 5,
                  langEn: "az",
                },
              ]?.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.langEn}>
                    {item.langEn.toUpperCase()}
                  </MenuItem>
                );
              })
            : [
                ...languages,
                {
                  id: 3,
                  langEn: "am",
                },
              ]?.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.langEn}>
                    {item.langEn.toUpperCase()}
                  </MenuItem>
                );
              })
          : [
              ...languages,
              {
                id: 3,
                langEn: "am",
              },
              {
                id: 5,
                langEn: "az",
              },
            ]?.map((item) => {
              return (
                <MenuItem key={item.id} value={item.langEn}>
                  {item.langEn.toUpperCase()}
                </MenuItem>
              );
            })}
      </Select>
    </FormControl>
  );
}
