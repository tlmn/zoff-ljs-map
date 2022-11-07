import React, { Fragment, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./map.css";
import { BUNDESLAENDER } from "../data/bundeslaender";
import FederalEntity from "./overlay/federalEntity";
import useAppContext from "../hooks/useAppContext";
import SetViewOnInputChange from "./setViewOnInputChange";
import { setEntities } from "../lib/lib";
import Markers from "./markers";

const Map = () => {
  const {
    appState: {
      map: { center, bounds },
    },
    setAppState
  } = useAppContext();

  useEffect(() => {
    setEntities(setAppState);
  }, []);

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
      {BUNDESLAENDER.features.map((FEDERALSTATE, index) => (
        <Fragment key={index}>
          <FederalEntity data={FEDERALSTATE} />
        </Fragment>
      ))}
      <Markers />
      <SetViewOnInputChange />
    </MapContainer>
  );
};

export default Map;
