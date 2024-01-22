import * as React from "react";
import {
  Box,
  Divider,
  Avatar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getMe } from "../../../store/actions/auth-action";
import PersonIcon from "@mui/icons-material/Person";
import PaymentIcon from "@mui/icons-material/Payment";
import HistoryIcon from "@mui/icons-material/History";
import InfoIcon from "@mui/icons-material/Info";
import HelpIcon from "@mui/icons-material/Help";
import { SUPORT_PAGE } from "../../../routing/pats";

const Sidebar = ({ state, setState }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.admin);

  React.useEffect(() => {
    dispatch(getMe());
  }, []);

  console.log(user);
  return (
    <Drawer anchor={"left"} open={state} onClose={() => setState(false)}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => setState(false)}
        onKeyDown={() => setState(false)}
      >
        <Box p={2} sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Box>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <PersonIcon fontSize="medium" sx={{ color: "white" }} />
            </Avatar>
          </Box>
          <Box>
            <Typography variant="h5" sx={{ color: "primary.main" }}>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="caption" sx={{ color: "primary.main" }}>
              {user?.email}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PaymentIcon sx={{ color: "primary.main" }} />
              </ListItemIcon>
              <ListItemText primary="Payment methods" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HistoryIcon sx={{ color: "primary.main" }} />
              </ListItemIcon>
              <ListItemText primary="History" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate(SUPORT_PAGE)}>
              <ListItemIcon>
                <HelpIcon sx={{ color: "primary.main" }} />
              </ListItemIcon>
              <ListItemText primary="Suport" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => window.open("https://jsxmachines.com/#0")}
            >
              <ListItemIcon>
                <InfoIcon sx={{ color: "primary.main" }} />
              </ListItemIcon>
              <ListItemText primary="Info" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
