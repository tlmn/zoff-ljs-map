import { useEffect } from "react";

import useAppContext from "../hooks/useAppContext";
import { useMap } from "react-leaflet";
import { geoContains } from "d3";
import { BUNDESLAENDER } from "../data/bundeslaender";
import { calcDistance } from "./lib/lib";

const SetViewOnInputChange = () => {
  const {
    appState: {
      map: { bounds, center },
      entities,
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
    let currentBundesland = BUNDESLAENDER.features.filter((BUNDESLAND) =>
      geoContains(BUNDESLAND, center)
    )[0];

    let currentBundeslandName = currentBundesland?.properties?.name
      ? currentBundesland?.properties?.name
      : "";

    setAppState((prev) => ({
      ...prev,
      currentLocation: {
        ...prev.currentCity,
        bundesland: currentBundeslandName,
      },
    }));

    if (entities.length > 0) {
      const entitiesWDistances = entities.map((entity) => ({
        ...entity,
        distanceCurrentLocation: calcDistance(
          entity.meet_coordinates[0],
          entity.meet_coordinates[1],
          center[0],
          center[1]
        ),
      }));
      setAppState((prev) => ({ ...prev, entities: entitiesWDistances }));
    }
  }, [center, setAppState]);
};

export default SetViewOnInputChange;
