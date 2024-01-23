import { Box, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import "../boxOptions.css";

const ChooseBox = ({ setStep }) => {
  const box = useSelector((state) => state.box.box);
  return <Box>ChooseBox</Box>;
};

export default ChooseBox;
