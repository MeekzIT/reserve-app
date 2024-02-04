import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinearProgress } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import BoxPresent from "./steps/Present";
import PaymentStep from "./steps/PaymentStep";
import ChooseMethod from "./steps/ChooseMethod";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./boxOptions.css";
import { getBoxItems } from "../../store/actions/boxAction";

const BoxOptions = ({ setOpen }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [price, setPrice] = useState(0);
  const [worker, setWorker] = useState(false);
  const [modes, setModes] = useState([]);
  const [time, setTime] = useState();
  const [post, setPost] = useState();

  const currentBox = useSelector((state) => state.box.box);
  const stepComponent = useMemo(() => {
    switch (step) {
      case 1:
        return <BoxPresent setStep={setStep} />;
      case 2:
        return (
          <ChooseMethod
            setStep={setStep}
            setPrice={setPrice}
            modes={modes}
            setModes={setModes}
            price={price}
            worker={worker}
            setWorker={setWorker}
            time={time}
            setTime={setTime}
            post={post}
            setPost={setPost}
          />
        );
      case 3:
        return (
          <PaymentStep
            setOpen={setOpen}
            setStep={setStep}
            modes={modes}
            price={price}
            worker={worker}
            time={time}
            post={post}
          />
        );
      default:
        return <BoxPresent setStep={setStep} />;
    }
  }, [step, modes, price, worker]);
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
  }, [currentBox, dispatch]);
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
