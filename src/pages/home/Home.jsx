import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  YMaps,
  Map,
  ZoomControl,
  GeolocationControl,
  Placemark,
  RouteButton,
} from "react-yandex-maps";
import { getBox, getBoxes } from "../../store/actions/boxAction";
import useGeolocation from "react-hook-geolocation";

const HomePage = () => {
  const dispatch = useDispatch();
  const geolocation = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 15000,
    timeout: 12000,
  });
  const defaultPin = [40.18111, 44.51361];
  const data = useSelector((state) => state.box.boxes);
  const box = useSelector((state) => state.box.box);
  useEffect(() => {
    dispatch(getBoxes());
  }, []);
  return (
    <div>
      <YMaps>
        <Map
          defaultState={{
            center: [geolocation.latitude, geolocation.longitude] || defaultPin,
            zoom: 12,
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
          {data?.map(({ id, lat, lng, name, desc }) => {
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
                onClick={() => {
                  dispatch(
                    getBox({
                      id,
                    })
                  );
                  console.log(desc);
                }}
              />
            );
          })}
        </Map>
      </YMaps>
    </div>
  );
};

export default HomePage;
