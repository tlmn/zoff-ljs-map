import { useEffect } from "react";

import useAppContext from "../hooks/useAppContext";
import { useMap } from "react-leaflet";
import { geoContains } from "d3";
import { BUNDESLAENDER } from "../data/bundeslaender";

const SetViewOnInputChange = () => {
  const {
    appState: {
      map: { bounds, center },
    },
    setAppState,
  } = useAppContext();

  const map = useMap();

  useEffect(() => {
    let offset = 0.5;
    let newBounds = [
      [bounds[0][0] + offset, bounds[0][1] - offset],
      [bounds[1][0] - offset, bounds[1][1] + offset],
    ];
    map.flyToBounds(newBounds);
  }, [bounds, map]);

  useEffect(() => {
    let currentFederalState = BUNDESLAENDER.features.filter((FEDERALSTATE) =>
      geoContains(FEDERALSTATE, center)
    )[0];

    let currentFederalStateName = currentFederalState?.properties?.name
      ? currentFederalState?.properties?.name
      : "";

    setAppState((prev) => ({
      ...prev,
      currentLocation: {
        ...prev.currentCity,
        federalState: currentFederalStateName,
      },
    }));
  }, [center, setAppState]);
};

export default SetViewOnInputChange;
