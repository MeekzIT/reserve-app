import { Box, Typography, Button, Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import "../boxOptions.css";
import { useState } from "react";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PaymentStep = ({ setStep, setVariant, tab }) => {
  const [value, setValue] = useState(tab);

  const handleChange = (event, newValue) => {
    newValue == 0 ? setVariant("now") : setVariant("reserve");
    setValue(newValue);
  };
  return (
    <div>
      <div className="header">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} textColor="secondary">
              <Tab disabled label="Now" {...a11yProps("now")} />
              <Tab disabled label="Reserve" {...a11yProps("reserve")} />
            </Tabs>
          </Box>
        </Box>
      </div>
      <div className="body">
        PaymentStep
        <Button fullWidth variant="contained" onClick={() => setStep(3)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaymentStep;
