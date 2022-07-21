import { useEffect } from "react";

import useAppContext from "../hooks/useAppContext";
import { useMap } from "react-leaflet";

const SetViewOnInputChange = () => {
  const {
    appState: {
      map: { bounds },
    },
  } = useAppContext();

  const map = useMap();

  useEffect(() => {
    let offset= 0.5
    let newBounds = [
      [bounds[0][0] + offset, bounds[0][1] - offset],
      [bounds[1][0] - offset, bounds[1][1] + offset],
    ];
    map.flyToBounds(newBounds);
  }, [bounds, map]);
};

export default SetViewOnInputChange;
