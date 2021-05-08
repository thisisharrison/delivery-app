import React, { useEffect, useRef, useState, useContext } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import PropTypes from "prop-types";
import PathContext from "../../context/context";

import "./map.scss";

const Map = (props) => {
  const [map, setMap] = useState(null);
  const [service, setService] = useState(null);
  const { path, setPath } = useContext(PathContext);

  const loader = new Loader({
    apiKey: process.env.REACT_APP_MAPS_API_KEY,
    version: "weekly",
    libraries: ["places", "directions"],
  });

  const mapOptions = {
    center: {
      lat: 22.32,
      lng: 114.17,
    },
    zoom: 11,
  };

  const mapRef = useRef(null);

  useEffect(() => {
    loader
      .load()
      .then(
        () =>
          new Promise((resolve) =>
            setMap(new window.google.maps.Map(mapRef.current, mapOptions))
          )
      )
      .then(() => {
        setService(new window.google.maps.places.PlacesService(map));
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    if (!map) return;
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    displayRoute(directionsService, directionsRenderer);
  }, [path]);

  const displayRoute = (directionsService, directionsRenderer) => {
    const waypts = path.path.map((sub) => {
      return {
        location: new window.google.maps.LatLng(
          parseFloat(sub[0]),
          parseFloat(sub[1])
        ),
        stopover: true,
      };
    });

    const pts = path.path.length;

    directionsService.route(
      {
        origin: waypts[0].location,
        destination: waypts[pts - 1].location,
        waypoints: waypts.slice(1, pts - 1),
        optimizeWaypoints: true,
        travelMode: "DRIVING",
      },
      (response, status) => {
        if (status === "OK" && response) {
          directionsRenderer.setDirections(response);
        } else {
          console.error(status);
        }
      }
    );
  };

  return (
    <div id="map" ref={mapRef}>
      {JSON.stringify(path, undefined)}
    </div>
  );
};

Map.propTypes = {};

export default Map;
