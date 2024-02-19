import { useState, useCallback } from "react";
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
  Checkbox,
  FormGroup,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import dayjs from "dayjs";

import "../boxOptions.css";
import {} from "../../../store/actions/boxAction";
import { getWord } from "../../../hooks/useWord";
const ChooseBox = ({
  setPrice,
  setModes,
  modes,
  price,
  setWorker,
  worker,
  time,
  setTime,
  post,
  setPost,
}) => {
  const dispatch = useDispatch();
  const now = dayjs();
  const formattedTime = now.format("HH:mm");
  const items = useSelector((state) => state.box.items);

  const boxCars = useSelector((state) => state.box.boxCars);
  const boxModes = useSelector((state) => state.box.boxModes);
  const workers = useSelector((state) => state.worker.workers);
  const hours = useSelector((state) => state.worker.hours);
  const [priceValue, setPriceValue] = useState(price);
  const [priceValueCar, setPriceValueCar] = useState(price);
  const [workerValue, setWorkerValue] = useState(worker);
  const [timeValue, setTimeValue] = useState();
  const [postValue, setPostValue] = useState(post);

  const handleChange = (event) => {
    setTime(event.target.value);
    setTimeValue(event.target.value);
  };

  const handleChangePost = (event) => {
    setPost(event.target.value);
    setPostValue(event.target.value);
  };

  const handleChangeWorker = (event) => {
    setWorker(event.target.value);
    setWorkerValue(event.target.value);
    setPrice(0);
    setPriceValue(0);
  };

  const modeValues = useCallback(() => {
    boxModes?.map((item) =>
      item.price == 0
        ? modes.map((i) => i == item.id).length == 0
          ? setModes((prev) => [...prev, item.id])
          : null
        : null
    );
  }, [boxModes, modes]);

  let disablePrice = false;
  if (worker == "true") {
    disablePrice = true;
  }
  if (timeValue !== "now") {
    disablePrice = true;
  }

  return (
    <div>
      {workers?.length > 0 && (
        <Box mt={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Time</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={timeValue}
              label={null}
              onChange={handleChange}
            >
              <MenuItem value={"now"}>Now</MenuItem>
              {hours?.map((time) => {
                return (
                  <MenuItem value={time.start} disabled={!time.access}>
                    {time.start}-{time.end}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      )}
      {workers?.length > 0 && (
        <Box>
          <FormControl>
            <FormLabel>Worker</FormLabel>
            <RadioGroup row value={workerValue} onChange={handleChangeWorker}>
              <FormControlLabel
                value={true}
                control={<Radio />}
                label={"Yes"}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label={"No"}
              />
            </RadioGroup>
          </FormControl>
        </Box>
      )}
      {timeValue == "now" && workerValue !== "true" && (
        <Box>
          <FormControl>
            <FormLabel>Choose post</FormLabel>
            <RadioGroup row value={postValue} onChange={handleChangePost}>
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
        </Box>
      )}

      <Box>
        {workerValue == "true" && (
          <FormControl>
            <FormLabel>Choose car type</FormLabel>
            <RadioGroup
              row
              value={priceValueCar}
              onChange={(e) => {
                setPrice(Number(e.target.value));
                setPriceValue(Number(e.target.value));
                setPriceValueCar(Number(e.target.value));
                setModes([]);
                modeValues();
              }}
            >
              {boxCars?.map((i) => {
                return (
                  <FormControlLabel
                    key={i?.id}
                    value={i?.price}
                    control={<Radio />}
                    label={getWord(i?.Type)}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        )}
      </Box>
      <Box>
        {workerValue == "true" && priceValue ? (
          <FormControl>
            <FormLabel>Choose wash modes</FormLabel>
            <FormGroup row>
              {boxModes?.map((i) => {
                return (
                  <FormControlLabel
                    required
                    key={i.id}
                    control={
                      <Checkbox
                        defaultChecked={Number(i.price) == 0}
                        readOnly={priceValueCar == 0}
                        disabled={Number(i.price) == 0}
                        onChange={(e) => {
                          e.target.checked
                            ? setPrice((price) => price + Number(i.price))
                            : setPrice((price) => price - Number(i.price));
                          e.target.checked
                            ? setPriceValue((price) => price + Number(i.price))
                            : setPriceValue((price) => price - Number(i.price));
                          if (e.target.checked) {
                            setModes((prev) => [...prev, i.id]);
                          } else {
                            setModes(modes.filter((item) => item !== i.id));
                          }
                        }}
                      />
                    }
                    label={getWord(i?.Category)}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        ) : null}
      </Box>
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
