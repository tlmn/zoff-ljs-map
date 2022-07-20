import React, { useState } from "react";
import { GeoJSON } from "react-leaflet";

const FederalEntity = ({ data }) => {
  const [isMouseHover, setIsMouseHover] = useState(false);

  return (
    <GeoJSON
      data={data}
      onEachFeature={(_, layer) =>
        layer.on({
          click: () => console.log("click"),
          mouseover: () => setIsMouseHover(true),
          mouseout: () => setIsMouseHover(false),
        })
      }
      style={{
        fillColor: isMouseHover ? "red" : "purple",
        color: "white",
        weight: "3",
      }}
    />
  );
};

export default FederalEntity;
