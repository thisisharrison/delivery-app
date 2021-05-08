import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";

export default class Map extends Component {
  static defaultProps = {
    center: { lat: 22.32, lng: 114.17 },
    zoom: 11,
  };

  render() {
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        ></GoogleMapReact>
      </div>
    );
  }
}

Map.propTypes = {};
