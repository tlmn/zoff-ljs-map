import axios from "axios";
import jsonata from "jsonata";
import { ENTITIES_MAP } from "../data/entitiesMap";

// Calculate distance as the crow flies between two points
export const getDistance = (location_1, location_2) => {
  var R = 6371;
  var dLat = toRad(location_2.lat - location_1.lat);
  var dLon = toRad(location_2.lon - location_1.lon);
  var radLat1 = toRad(location_1.lat);
  var radLat2 = toRad(location_2.lat);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(radLat1) *
      Math.cos(radLat2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  return Math.round(d * 10) / 10;
};

const toRad = (value) => (value * Math.PI) / 180;

export const setEntities = (setAppState) => {
  var credentials = btoa(
    process.env.REACT_APP_LJS_API_USER +
      ":" +
      process.env.REACT_APP_LJS_API_PASSWORD
  );
  var config = {
    method: "get",
    url: "https://login.stage.linksjugend-solid.de/api/v1/map/getorgunits",
    headers: {
      Authorization: "Basic " + credentials,
    },
  };

  axios(config).then((res) => {
    setAppState((prev) => ({
      ...prev,
      entities: res.data,
      filteredEntities: filterResults(res.data),
    }));
  });
};

export const filterResults = (entities, federalState = "") => {
  // filter entities by Bundesland
  const filteredResults = entities.filter(
    (entity) => entity.verband_name === federalState
  );

  // jsonata expression for grouping entities by Bundesland
  const groupExpression = jsonata("*^(verband_name){verband_name:[$]}");

  return federalState !== ""
    ? groupExpression.evaluate(filteredResults) // return grouped filtered results if federalState is not ""
    : groupExpression.evaluate(entities); // return grouped non-filtered results if federalState is ""
};

export const getEntityName = (label) => {
  const entityName = ENTITIES_MAP.filter((entity) => entity.label === label)[0]
    ?.name;

  return typeof entityName !== "undefined" ? entityName : "";
};

export const getEntityLabel = (name) => {
  const entityLabel = ENTITIES_MAP.filter((entity) => entity.name === name)[0]
    ?.label;

  return typeof entityLabel !== "undefined" ? entityLabel : "";
};

export const addDistance = (array, center) => {
  // calculate distance to center location for every item of the array
  const arrayWDistance = array.map((item) => ({
    ...item,
    distance: getDistance(
      {
        lat: parseFloat(item.meet_coordinates[0]),
        lon: parseFloat(item.meet_coordinates[1]),
      },
      { lat: center[0], lon: center[1] }
    ),
  }));

  // return sorted array
  return arrayWDistance.sort((a, b) => a.distance - b.distance);
};

export const getLocation = async (queryString) => {
  const config = {
    url: process.env.REACT_APP_LJS_GEOCODING_API,
    method: "get",
    params: { q: queryString },
  };

  return await axios(config);
};
