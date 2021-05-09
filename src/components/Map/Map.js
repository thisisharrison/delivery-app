import React, { useEffect, useRef, useState } from "react";
// import context to receive path
import { usePathContext } from "../../context/context";
// https://googlemaps.github.io/js-api-loader/index.html
import { Loader } from "@googlemaps/js-api-loader";

import "./map.scss";

const Map = () => {
  // setting states
  const [map, setMap] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  // receive path from context
  const { path, setPath } = usePathContext();

  // loader exposes a Promise and callback interface
  // set libaries: directions to for Directions Renderer and Directions Services
  const loader = new Loader({
    apiKey: process.env.REACT_APP_MAPS_API_KEY,
    version: "weekly",
    libraries: ["places", "directions"],
  });

  // set initial mapOptions
  const mapOptions = {
    center: {
      lat: 22.32,
      lng: 114.17,
    },
    zoom: 11,
  };

  // mapRef to be assigned with the DOM element when it mounts
  const mapRef = useRef(null);

  useEffect(() => {
    // use the loader function and update state's map, and directions renderer and service
    loader
      .load()
      .then(() => {
        setMap(new window.google.maps.Map(mapRef.current, mapOptions));
        setDirectionsService(new window.google.maps.DirectionsService());
        setDirectionsRenderer(new window.google.maps.DirectionsRenderer());
      })
      .catch((e) => {
        // error handling
        console.error(e);
      });
    // console.log("LOAD MAP");
  }, []);

  useEffect(() => {
    if (!window.google) return;
    // clearing directions when context is updated to null
    if (!path && directionsRenderer) {
      directionsRenderer.setMap(null);
      // reset to default mapOptions
      map.setCenter(mapOptions.center);
      map.setZoom(11);
      // console.log("CLEAR PATH");
      return;
    }
    // update directions when context is updated
    directionsRenderer.setMap(map);
    // display route
    displayRoute(directionsService, directionsRenderer);
    // console.log("DISPLAY PATH");
  }, [path]);

  const displayRoute = (directionsService, directionsRenderer) => {
    // map over array from API response and create google LatLng geographical coordinates
    const waypts = path.path.map((sub) => {
      return {
        location: new window.google.maps.LatLng(
          parseFloat(sub[0]),
          parseFloat(sub[1])
        ),
        stopover: true,
      };
    });

    // total waypoints
    const pts = path.path.length;

    // set route with API response
    // index 0 for origin and last coordinate as destination
    // coordinates inbetween origin and destination are waypoints
    // set travelMode to driving
    directionsService.route(
      {
        origin: waypts[0].location,
        destination: waypts[pts - 1].location,
        waypoints: waypts.slice(1, pts - 1),
        optimizeWaypoints: true,
        travelMode: "DRIVING",
      },
      (response, status) => {
        // display directions
        if (status === "OK" && response) {
          directionsRenderer.setDirections(response);
        } else {
          // error handling
          console.error(status);
        }
      }
    );
  };

  return <div id="map" data-testid="map" ref={mapRef}></div>;
};

export default Map;
