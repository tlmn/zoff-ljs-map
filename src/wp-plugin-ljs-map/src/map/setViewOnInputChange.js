import { useEffect } from "react";

import useAppContext from "../hooks/useAppContext";
import { useMap } from "react-leaflet";

const SetViewOnInputChange = () => {
  const {
    appState: {
      map: { center },
    },
  } = useAppContext();

  const map = useMap();

  useEffect(() => {
    map.flyTo(center, 8);
  }, [center]);
};

export default SetViewOnInputChange;
