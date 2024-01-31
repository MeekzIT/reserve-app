import { Box, Typography, Button, Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import "../boxOptions.css";
import { useState } from "react";

const PaymentStep = ({ setStep, setVariant, tab }) => {
  return (
    <div className="body">
      PaymentStep
      <Button fullWidth variant="contained" onClick={() => setStep(3)}>
        Next
      </Button>
    </div>
  );
};

export default PaymentStep;
