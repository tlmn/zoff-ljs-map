import React, { Fragment, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./map.css";
import { BUNDESLAENDER } from "../data/bundeslaender";
import FederalEntity from "./federalEntity";
import useAppContext from "../hooks/useAppContext";
import SetViewOnInputChange from "./setViewOnInputChange";
import { getEntities } from "./lib/lib";

const Map = () => {
  const {
    appState: {
      map: { center, bounds },
    },
  } = useAppContext();

  useEffect(() => {
    console.log(getEntities());
  });

  return (
    <MapContainer
      center={center}
      bounds={bounds}
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
      <SetViewOnInputChange />
    </MapContainer>
  );
};

export default Map;
