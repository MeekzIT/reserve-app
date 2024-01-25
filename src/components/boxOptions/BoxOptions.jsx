import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, LinearProgress } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import BoxPresent from "./components/Present";
import PaymentStep from "./components/PaymentStep";
import ChooseMethod from "./components/ChooseMethod";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./boxOptions.css";
import { getBoxItems } from "../../store/actions/boxAction";

const BoxOptions = ({ setOpen }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [variant, setVariant] = useState("now");
  const [box, setBox] = useState();
  const [price, setPrice] = useState(0);
  const [worker, setWorker] = useState(false);

  const currentBox = useSelector((state) => state.box.box);
  const stepComponent = useMemo(() => {
    switch (step) {
      case 1:
        return <BoxPresent setStep={setStep} />;
      case 2:
        return (
          <ChooseMethod
            setStep={setStep}
            setVariant={setVariant}
            tab={variant == "now" ? 0 : 1}
            box={box}
            setBox={setBox}
            setPrice={setPrice}
            price={price}
            worker={worker}
            setWorker={setWorker}
          />
        );
      case 3:
        return (
          <PaymentStep
            setStep={setStep}
            setVariant={setVariant}
            tab={variant == "now" ? 0 : 1}
          />
        );
      default:
        return <BoxPresent setStep={setStep} />;
    }
  }, [step, variant, box, price, worker]);
  const progress = useMemo(() => {
    switch (step) {
      case 1:
        return 34;
      case 2:
        return 66;
      case 3:
        return 100;
      default:
        return 34;
    }
  }, [step]);
  useEffect(() => {
    currentBox &&
      dispatch(
        getBoxItems({
          ownerId: currentBox.ownerId,
          boxId: currentBox.id,
        })
      );
  }, [currentBox]);

  console.log(box, price, worker, "111111");

  return (
    <div className="boxOptions">
      {step !== 1 && (
        <div className="back">
          <ArrowBackIcon
            fontSize="small"
            sx={{ color: "primary.main" }}
            onClick={() => setStep(step - 1)}
          />
        </div>
      )}
      <div className="close">
        <ClearIcon
          fontSize="small"
          sx={{ color: "primary.main" }}
          onClick={() => {
            setOpen(false);
            setStep(1);
            setVariant("now");
          }}
        />
      </div>
      {stepComponent}
      <dic style={{ width: "100%" }}>
        <LinearProgress variant="determinate" value={progress} />
      </dic>
    </div>
  );
};

export default BoxOptions;
