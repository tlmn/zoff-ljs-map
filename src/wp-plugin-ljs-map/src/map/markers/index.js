import React, { Fragment } from "react";

import { Marker, Popup } from "react-leaflet";
import useAppContext from "../../hooks/useAppContext";
import L from "leaflet";

const getIcon = () =>
  L.icon({ iconUrl: require("../images/icon.png"), iconSize: 30 });

const Markers = () => {
  const {
    appState: { entities },
  } = useAppContext();

  return (
    <>
      {entities.length > 0 &&
        entities.map((entity, index) => {
          let coordinates = [
            parseFloat(entity.meet_coordinates[1]),
            parseFloat(entity.meet_coordinates[0]),
          ];

          return (
            <Fragment key={index}>
              <Marker position={coordinates} icon={getIcon()}>
                <Popup>{entity.name}</Popup>
              </Marker>
            </Fragment>
          );
        })}
    </>
  );
};

export default Markers;
