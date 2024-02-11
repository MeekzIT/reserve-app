import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activateOrder, getActiveOrders } from "../../store/actions/boxAction";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import EngineeringIcon from "@mui/icons-material/Engineering";
import PaymentsIcon from "@mui/icons-material/Payments";
import {
  formatDateToWords,
  getCurrency,
  getPaymentStatus,
} from "../../hooks/helpers";

const Order = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.box.activeOrders);
  const user = useSelector((state) => state.auth.admin);

  useEffect(() => {
    dispatch(getActiveOrders());
  }, []);
  //   console.log(data, "-------");

  return (
    <Box p={2}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h3" color="primary.main">
          Activate Point
        </Typography>
      </Box>
      {data?.map((i) => {
        return (
          <Box>
            {/* {i?.Order && (
              <YMaps query={{ lang: "en_RU" }}>
                <Map
                  defaultState={{
                    center: [data.box.lat, data.box.lng],
                    zoom: 16,
                  }}
                  style={{
                    width: "100%",
                    height: "200px",
                  }}
                  modules={["geolocation", "geocode"]}
                  controls={["smallMapDefaultSet"]}
                >
                  <Placemark
                    geometry={[i?.Order?.Box?.lat, i?.Order?.Box?.lng]}
                    options={{
                      preset: "islands#blueIcon",
                      hideIconOnBalloonOpen: true,
                      balloonOffset: [3, -40],
                    }}
                  />
                </Map>
              </YMaps>
            )} */}
            <Box
              mt={1}
              sx={{
                padding: "15px 10px",
                background: "white",
                borderRadius: "5px",
              }}
            >
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <EventIcon fontSize="small" sx={{ color: "primary.main" }} />{" "}
                {formatDateToWords(i?.Order?.createdAt.slice(0, 10))}{" "}
                {i?.Order?.time}
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <LocalAtmIcon fontSize="small" sx={{ color: "primary.main" }} />{" "}
                {i?.Order?.price} {getCurrency(user?.countryId)}
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <PaymentsIcon fontSize="small" sx={{ color: "primary.main" }} />{" "}
                payment {getPaymentStatus(i?.Order?.payment)}
              </Typography>
            </Box>
            <Box pt={2}>
              <Button
                variant="outlined"
                onClick={() => {
                  dispatch(
                    activateOrder({
                      id: i.id,
                    })
                  );
                }}
                fullWidth
              >
                activate
              </Button>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
export default Order;
