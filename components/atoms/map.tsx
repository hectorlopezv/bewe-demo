import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
const containerStyle = {
  width: "100%",
  height: "352px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function Map({
  location,
}: {
  location:
    | string
    | {
        lat: number;
        lng: number;
      };
}) {
  const [newcenter, setNewcenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);
  useEffect(() => {
    const abortController = new AbortController();
    const data = async () => {
      if (location === "") return "";
      const latnadlong = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
      const res = await fetch(latnadlong, { signal: abortController.signal });
      const data = await res.json();
      if (data?.results && data?.results.length === 0)
        return toast.error("Location not found");
      const { lat, lng } = data.results[0]?.geometry?.location;
      setNewcenter({ lat, lng });
    };
    data();
    return () => {
      abortController.abort(); // Cancel the request if component unmounts
    };
  }, [location]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={newcenter || center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
