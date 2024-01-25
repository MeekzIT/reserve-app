import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  ButtonGroup,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import "../../boxOptions.css";
import { getItemCars } from "../../../../store/actions/boxAction";
const ChooseBox = ({
  setStep,
  box,
  setBox,
  setPrice,
  price,
  setWorker,
  worker,
}) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.box.items);
  const itemCars = useSelector((state) => state.box.itemCars);
  const [boxValue, setBoxValue] = useState(box);
  const [priceValue, setPriceValue] = useState(price);
  const [workerValue, setWorkerValue] = useState(worker);

  const handleChange = (event) => {
    setBox(event.target.value);
    setBoxValue(event.target.value);
  };

  const handleChangeWorker = (event) => {
    console.log(event, "event.target.value");

    setWorker(event.target.value);
    setWorkerValue(event.target.value);
    setPrice(0);
    setPriceValue(0);
  };

  let disablePrice = false;
  if (boxValue == null) {
    disablePrice = true;
  } else if (worker == "true") {
    disablePrice = true;
  }

  useEffect(() => {
    boxValue &&
      dispatch(
        getItemCars({
          id: boxValue,
        })
      );
  }, [boxValue]);
  console.log(itemCars, "workerValue");

  return (
    <div>
      <FormControl>
        <FormLabel>Worker</FormLabel>
        <RadioGroup row value={workerValue} onChange={handleChangeWorker}>
          <FormControlLabel value={true} control={<Radio />} label={"Yes"} />
          <FormControlLabel value={false} control={<Radio />} label={"No"} />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Choose post</FormLabel>
        <RadioGroup row value={boxValue} onChange={handleChange}>
          {items?.map((i) => {
            if (i.access) {
              return (
                <FormControlLabel
                  //   disabled={workerValue === "true"}
                  key={i.id}
                  value={i.p2}
                  control={<Radio />}
                  label={`№ ${i.name}`}
                />
              );
            }
          })}
        </RadioGroup>
      </FormControl>
      {workerValue == "true" && boxValue && (
        <FormControl>
          <FormLabel>Choose car type</FormLabel>
          <RadioGroup
            row
            value={priceValue}
            onChange={(e) => {
              setPrice(e.target.value);
              setPriceValue(e.target.value);
            }}
          >
            {itemCars?.map((i) => {
              return (
                <FormControlLabel
                  key={i.id}
                  value={i.price}
                  control={<Radio />}
                  label={i.Type.nameAm}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      )}
      <Box>
        <ButtonGroup fullWidth>
          <Button
            disabled={price == 0 || disablePrice}
            onClick={() => {
              setPrice((price) => price - 100);
              setPriceValue((price) => price - 100);
            }}
          >
            <RemoveIcon />
          </Button>
          <Button
            variant="contained"
            sx={{
              background: "primary.main",
              color: "secondary.main",
            }}
          >
            {priceValue}
          </Button>
          <Button
            disabled={disablePrice}
            onClick={() => {
              setPrice((price) => price + 100);
              setPriceValue((price) => price + 100);
            }}
          >
            <AddIcon />
          </Button>
        </ButtonGroup>
      </Box>
    </div>
  );
};

export default ChooseBox;
