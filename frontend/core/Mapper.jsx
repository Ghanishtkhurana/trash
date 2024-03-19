import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ lat, lng }) => (
  <div className="text-red-600">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4c3.866 0 7 3.134 7 7 0 3.866-7 13-7 13s-7-9.134-7-13c0-3.866 3.134-7 7-7z"
      />
      <circle cx={12} cy={11} r={3} fill="red" />
    </svg>
  </div>
);

const Mapper = ({ handleTheClose, setter }) => {
  const [location, setLocation] = useState(null);
  let [isLoading, setIsLoading] = useState(true);

  const handleMapClick = async ({ x, y, lat, lng, event }) => {
    console.log("Latitude:", lat);
    console.log("Longitude:", lng);
    setLocation({ lat, lng });
    setter({ latitude: lat, longitude: lng });
    handleTheClose();
    // You can set state here if needed
    // const response = await fetch(
    //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"`
    // );
    // const data = await response.json();
    // // const address = data.results[0].formatted_address;

    // console.log("Address:", data);
  };

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 21,
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          let obj = {
            center: {
              lat: latitude,
              lng: longitude,
            },
            zoom: 11,
          };
          setLocation(obj);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported.");
    }
  }, []);
  return (
    <>
      {!isLoading ? (
        <div style={{ height: "100%", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo",
            }}
            defaultCenter={location?.center}
            defaultZoom={location?.zoom}
            onClick={handleMapClick}
          >
            <AnyReactComponent
              lat={location?.center?.lat}
              lng={location?.center?.lng}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Mapper;
