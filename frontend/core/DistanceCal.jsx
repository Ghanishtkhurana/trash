import React, { useEffect } from "react";

const DistanceCal = ({ setter, obj1, obj2 }) => {
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert degrees to radians
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }

  const distance = calculateDistance(
    obj1.latitude,
    obj1.longitude,
    obj2.latitude,
    obj2.longitude
  );
  console.log("Distance:", distance.toFixed(2), "km");
  useEffect(() => {
    setter(distance.toFixed(2));
  }, []);
  return <div>Distance {distance.toFixed(2)} km</div>;
};

export default DistanceCal;
