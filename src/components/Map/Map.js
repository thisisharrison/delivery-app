import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import PropTypes from "prop-types";

import "./map.scss";

const Map = (props) => {
  const loader = new Loader({
    apiKey: process.env.REACT_APP_MAPS_API_KEY,
    version: "weekly",
    libraries: ["places"],
  });

  const mapOptions = {
    center: {
      lat: 22.32,
      lng: 114.17,
    },
    zoom: 11,
  };

  const map = useRef(null);

  useEffect(() => {
    loader
      .load()
      .then(() => new window.google.maps.Map(map.current, mapOptions))
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return <div id="map" ref={map}></div>;
};

Map.propTypes = {};

export default Map;
