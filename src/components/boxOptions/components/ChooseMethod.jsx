import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Button, Tabs, Tab } from "@mui/material";
import { useSelector } from "react-redux";
import "../boxOptions.css";
import ChooseBox from "./now/ChooseBox";
import ChooseTime from "./reserve/ChooseTime";

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
        <div>
          <Typography>{children}</Typography>
        </div>
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

const ChooseMethod = ({
  setStep,
  setVariant,
  tab,
  box,
  setBox,
  setPrice,
  price,
  setWorker,
  worker,
}) => {
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
              <Tab label="Now" {...a11yProps("now")} />
              <Tab label="Reserve" {...a11yProps("reserve")} />
            </Tabs>
          </Box>
        </Box>
      </div>
      <div className="body">
        <CustomTabPanel value={value} index={0}>
          <ChooseBox
            box={box}
            setBox={setBox}
            setPrice={setPrice}
            price={price}
            worker={worker}
            setWorker={setWorker}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ChooseTime />
        </CustomTabPanel>
        <Box pt={2}>
          <Button
            fullWidth
            disabled={price == 0 || box == null}
            variant="contained"
            onClick={() => setStep(3)}
          >
            Next
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default ChooseMethod;
