import React, { Fragment } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./map.css";
import { BUNDESLAENDER } from "../data/bundeslaender";
import FederalEntity from "./federalEntity";
import useAppContext from "../hooks/useAppContext";

const Map = () => {
  const {
    appState: {
      map: { center, bounds },
    },
  } = useAppContext();

  return (
    <MapContainer
      bounds={bounds}
      center={center}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
      maxBounds
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {BUNDESLAENDER.features.map((BUNDESLAND, index) => (
        <Fragment key={index}>
          <FederalEntity data={BUNDESLAND} />
        </Fragment>
      ))}
    </MapContainer>
  );
};

export default Map;
