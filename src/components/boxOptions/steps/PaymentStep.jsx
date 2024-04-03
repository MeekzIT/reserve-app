import { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { io } from "socket.io-client";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  changePaymentStatus,
  setOrder,
} from "../../../store/actions/boxAction";
import "../boxOptions.css";

const PaymentStep = ({
  setOpen,
  setStep,
  modes,
  price,
  worker,
  time,
  post,
}) => {
  const dispatch = useDispatch();
  const socket = useRef(io("ws://localhost:8000"));
  const currentBox = useSelector((state) => state.box.box);

  // useEffect(() => {
  //   socket.current = ;
  // }, []);

  const handlePay = () => {
    dispatch(
      setOrder({
        worker,
        post,
        price,
        modes: JSON.stringify(modes),
        time,
        boxId: currentBox.id,
      })
    );
    socket.current.emit("create-order", {
      worker,
      post,
      price,
      modes: JSON.stringify(modes),
      time,
      boxId: currentBox.id,
    });
    setOpen(false);
  };

  return (
    <div className="body">
      PaymentStep 1
      <Button fullWidth variant="contained" onClick={handlePay}>
        Pay
      </Button>
    </div>
  );
};

export default PaymentStep;
