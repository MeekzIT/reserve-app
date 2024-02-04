import { Box, Typography, Button, Tabs, Tab } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import "../boxOptions.css";
import { useEffect, useState } from "react";
import { setOrder } from "../../../store/actions/boxAction";
import Swal from "sweetalert2";

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
  const currentBox = useSelector((state) => state.box.box);
  const orderSucces = useSelector((state) => state.box.orderSucces);

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
  };

  useEffect(() => {
    if (orderSucces == true) {
      Swal.fire({
        position: "center",
        iconColor: "#008491",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    return;
  }, [orderSucces]);
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
