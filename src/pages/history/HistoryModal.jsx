import { Box, Typography, Modal, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { getWord } from "../../hooks/useWord";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import {
  formatDateToWords,
  getCurrency,
  getPaymentStatus,
} from "../../hooks/helpers";
import EventIcon from "@mui/icons-material/Event";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import EngineeringIcon from "@mui/icons-material/Engineering";
import PaymentsIcon from "@mui/icons-material/Payments";
import ClearIcon from "@mui/icons-material/Clear";

const HistoryModal = ({ open, handleClose }) => {
  const data = useSelector((state) => state.history.single);
  const user = useSelector((state) => state.auth.admin);
  console.log(data, "historyhistoryhistory");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    bgcolor: "rgb(238, 242, 246)",
    border: "2px solid primary.main",
    boxShadow: 24,
    p: 0,
  };

  const styleLoading = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    bgcolor: "background.paper",
    border: "2px solid primary.main",
    boxShadow: 24,
    p: 4,
    display: "flex",
    justifyContent: "center",
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {data ? (
        <Box sx={style}>
          <div className="close">
            <ClearIcon
              fontSize="large"
              sx={{ color: "primary.main" }}
              onClick={handleClose}
            />
          </div>
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
                geometry={[data.box.lat, data.box.lng]}
                options={{
                  preset: "islands#blueIcon",
                  hideIconOnBalloonOpen: true,
                  balloonOffset: [3, -40],
                }}
              />
            </Map>
          </YMaps>
          <Box
            mt={1}
            sx={{
              padding: "15px 10px",
              background: "white",
              borderRadius: "5px",
            }}
          >
            <Typography>{data.box.name}</Typography>
          </Box>
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
              {formatDateToWords(data.createdAt.slice(0, 10))} at {data.time}
            </Typography>
            <Typography
              sx={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <LocalAtmIcon fontSize="small" sx={{ color: "primary.main" }} />{" "}
              {data.price} {getCurrency(user?.countryId)}
            </Typography>
            <Typography
              sx={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <PaymentsIcon fontSize="small" sx={{ color: "primary.main" }} />{" "}
              payment {getPaymentStatus(data?.payment)}
            </Typography>
          </Box>
          {data.modes.length > 0 && (
            <Box
              mt={1}
              sx={{
                padding: "15px 10px",
                background: "white",
                borderRadius: "5px",
              }}
            >
              {data?.enteryModes.map((i) => {
                return (
                  <Typography
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <BubbleChartIcon
                      fontSize="small"
                      sx={{ color: "primary.main" }}
                    />
                    {getWord(i)}
                  </Typography>
                );
              })}
            </Box>
          )}
          {data?.worker && (
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
                <EngineeringIcon
                  fontSize="small"
                  sx={{ color: "primary.main" }}
                />
                {data.worker.firstName} {data.worker.lastName}
              </Typography>
            </Box>
          )}
        </Box>
      ) : (
        <Box sx={styleLoading}>
          <CircularProgress />
        </Box>
      )}
    </Modal>
  );
};

export default HistoryModal;
