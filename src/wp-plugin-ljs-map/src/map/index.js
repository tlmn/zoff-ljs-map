import React, { Fragment } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./map.css";
import { BUNDESLAENDER } from "../data/bundeslaender";
import FederalEntity from "./federalEntity";

const Map = () => {
  const position = [51.1657, 10.4515];

  return (
    <MapContainer
      center={position}
      zoom={6}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
      maxZoom={10}
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

      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
