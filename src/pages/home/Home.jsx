import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import {
  YMaps,
  Map,
  ZoomControl,
  GeolocationControl,
  Placemark,
  RouteButton,
} from "react-yandex-maps";
import {
  getBox,
  getBoxCars,
  getBoxImages,
  getBoxModes,
  getBoxes,
} from "../../store/actions/boxAction";
import useGeolocation from "react-hook-geolocation";
import BoxOptions from "../../components/boxOptions/BoxOptions";
import { getBoxWorker, getWorkerHours } from "../../store/actions/workerAction";

const HomePage = () => {
  const dispatch = useDispatch();
  const geolocation = useGeolocation({});
  const defaultPin = [40.18111, 44.51361];
  const [open, setOpen] = useState(false);
  const data = useSelector((state) => state.box.boxes);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSelectPoint = (ownerId, id) => {
    dispatch(
      getBox({
        id,
      })
    );
    dispatch(
      getBoxImages({
        boxId: id,
      })
    );
    dispatch(
      getBoxModes({
        ownerId,
        boxId: id,
      })
    );
    dispatch(
      getBoxCars({
        ownerId,
        boxId: id,
      })
    );
    dispatch(
      getBoxWorker({
        id,
      })
    );
    dispatch(getWorkerHours({ id }));
    setOpen(true);
  };

  const map = useCallback(() => {
    return (
      <YMaps query={{ lang: "en_RU" }}>
        <Map
          defaultState={{
            center: [geolocation.latitude, geolocation.longitude] || defaultPin,
            zoom: open ? 15 : 12,
          }}
          style={{
            width: "100%",
            height: "100vh",
          }}
          modules={["geolocation", "geocode"]}
          controls={["smallMapDefaultSet"]}
        >
          <ZoomControl options={{ float: "right" }} />
          <GeolocationControl options={{ float: "left" }} />
          <RouteButton options={{ float: "right" }} />
          <Placemark
            geometry={
              [geolocation.latitude, geolocation.longitude] || defaultPin
            }
            options={{
              preset: "islands#redIcon",
              hideIconOnBalloonOpen: true,
              balloonOffset: [4, -40],
            }}
            properties={{
              iconContent: "ME",
            }}
          />
          {data?.map(({ id, lat, lng, name, desc, ownerId }) => {
            return (
              <Placemark
                key={id}
                geometry={[lat, lng]}
                options={{
                  preset: "islands#blueIcon",
                  hideIconOnBalloonOpen: true,
                  balloonOffset: [3, -40],
                }}
                properties={{
                  iconContent: "JS",
                  balloonContent: name,
                  hintContent: name,
                }}
                onClick={() => handleSelectPoint(ownerId, id)}
              />
            );
          })}
        </Map>
      </YMaps>
    );
  }, [
    data,
    defaultPin,
    geolocation.latitude,
    geolocation.longitude,
    handleSelectPoint,
    open,
  ]);

  useEffect(() => {
    dispatch(getBoxes());
  }, [dispatch]);

  return (
    <div>
      {!geolocation.latitude && !geolocation.longitude ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        map()
      )}

      <div className="center">{open && <BoxOptions setOpen={setOpen} />}</div>
    </div>
  );
};

export default HomePage;
