import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import BoxPresent from "./components/Present";

import "./boxOptions.css";
import ChooseBox from "./components/ChooseBox";

const BoxOptions = ({ setOpen }) => {
  const [step, setStep] = useState(1);
  const box = useSelector((state) => state.box.box);
  const stepComponent = useMemo(() => {
    switch (step) {
      case 1:
        return <BoxPresent setStep={setStep} />;
      case 2:
        return <ChooseBox setStep={setStep} />;
      default:
        return <BoxPresent setStep={setStep} />;
    }
  }, [step]);
  return (
    <Box className="boxOptions">
      <div className="close">
        <ClearIcon
          fontSize="small"
          sx={{ color: "primary.main" }}
          onClick={() => setOpen(false)}
        />
      </div>
      {stepComponent}
    </Box>
  );
};

export default BoxOptions;
