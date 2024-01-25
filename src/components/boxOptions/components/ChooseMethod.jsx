import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Button, Tabs, Tab } from "@mui/material";
import { useSelector } from "react-redux";
import "../boxOptions.css";
import ChooseBox from "./ChooseBox";

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
  return (
    <div className="body">
      <ChooseBox
        box={box}
        setBox={setBox}
        setPrice={setPrice}
        price={price}
        worker={worker}
        setWorker={setWorker}
      />

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
  );
};

export default ChooseMethod;
