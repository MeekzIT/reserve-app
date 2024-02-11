import { Box, Typography, Button } from "@mui/material";
import Slider from "react-slick";
import carWash1 from "../../../images/carWash.jpg";
import { useSelector } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import "../boxOptions.css";

const BoxPresent = ({ setStep }) => {
  const box = useSelector((state) => state.box.box);
  const images = useSelector((state) => state.box.boxImages);
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
    arrows: false,
  };

  return (
    <Box>
      <div className="present-images">
        <Slider {...settings}>
          {images?.map((i) => {
            return (
              <div key={i?.id}>
                <img src={i?.image} alt={i?.id} className="present-image" />
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="body">
        <Typography variant="h6">{box?.name}</Typography>
        <Typography sx={{ color: "text.secondary" }}>{box?.desc}</Typography>
        <Button fullWidth variant="contained" onClick={() => setStep(2)}>
          Order
        </Button>
      </div>
    </Box>
  );
};

export default BoxPresent;
