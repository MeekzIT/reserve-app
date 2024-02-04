import { Box, Button } from "@mui/material";
import "../boxOptions.css";
import ChooseBox from "../stepComponents/ChooseBox";

const ChooseMethod = ({
  setStep,
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
  return (
    <div className="body">
      <ChooseBox
        setPrice={setPrice}
        setModes={setModes}
        modes={modes}
        price={price}
        worker={worker}
        setWorker={setWorker}
        time={time}
        setTime={setTime}
        post={post}
        setPost={setPost}
      />

      <Box pt={2}>
        <Button
          fullWidth
          disabled={price == 0}
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
