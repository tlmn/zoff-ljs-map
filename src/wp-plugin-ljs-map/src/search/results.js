import React, { useEffect, useState } from "react";
import useAppContext from "../hooks/useAppContext";
import {
  getEntityLabel,
  filterResults,
  addDistance,
  getEntityName,
  getDistance,
} from "../lib/lib";

const Results = () => {
  const {
    appState: {
      entities,
      map: { center },
      currentLocation: { federalState },
    },
    setAppState
  } = useAppContext();
  
  // add component state for filtering entities list by Bundesland
  const [filteredResults, setFilteredResults] = useState(entities);

  useEffect(() => {
    const resultsWDistance = addDistance(entities, center);
    setFilteredResults(
      filterResults(resultsWDistance, getEntityLabel(federalState))
    );
  }, [federalState, center]);

  useEffect(() => {
    // group initial set of entities
    setFilteredResults(filterResults(entities, federalState));
  }, [entities]);

  return (
    <pre style={{ maxWidth: "20rem" }}>
      current center: {JSON.stringify(center)}
      <br />
      distance from Berlin:{" "}
      {getDistance(
        { lat: center[1], lon: center[0] },
        { lat: 52.5170365, lon: 13.3888599 }
      )}
      km
      <br />
      {Object.keys(filteredResults).map((key, index) => (
        <details key={index}>
          <summary>{getEntityName(key)}</summary>
          <ul>
            {filteredResults[key].map((item, index) => (
              <li key={index}>
                {item?.distance}: {item.name}
              </li>
            ))}
          </ul>
        </details>
      ))}
    </pre>
  );
};

export default Results;
