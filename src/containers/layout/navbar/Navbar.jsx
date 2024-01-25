import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { LanguageSwitcher } from "../../../components/languageSwitcher/LanguageSwitcher";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HOME_PAGE, LOGIN_PAGE, SETTIGS_PAGE } from "../../../routing/pats";
import { logoutAction } from "../../../store/actions/auth-action";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import "./navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    dispatch(logoutAction());
    navigate(LOGIN_PAGE);
  };

  return (
    <div className="navbar">
      {isAuth && (
        <Button variant="outlined" onClick={() => setOpenMenu(true)}>
          <MenuIcon
            sx={{
              color: "white",
            }}
            fontSize="large"
          />
        </Button>
      )}
      <Typography component="h2" onClick={() => navigate(HOME_PAGE)}>
        JS INNOVATIONS
      </Typography>
      <div className="navbarControlers">
        <Sidebar state={openMenu} setState={setOpenMenu} />

        {isAuth && (
          <div className="item">
            <PersonIcon
              sx={{
                color: "white",
              }}
              fontSize="large"
              onClick={handleClick}
              className="avatar"
            />
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem>
                <LanguageIcon
                  sx={{
                    color: "#008491",
                  }}
                />
                <LanguageSwitcher />
              </MenuItem>
              <MenuItem onClick={() => navigate(SETTIGS_PAGE)}>
                <SettingsIcon
                  sx={{
                    color: "#008491",
                  }}
                />
                {t("settings")}
              </MenuItem>
              <MenuItem onClick={handleLogOut}>
                <LogoutIcon
                  sx={{
                    color: "#008491",
                  }}
                />
                Logout
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
