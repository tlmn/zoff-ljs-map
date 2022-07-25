import axios from "axios";

export const calcDistance = (lat1, lon1, lat2, lon2) => {
  var R = 6371;
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var radLat1 = toRad(lat1);
  var radLat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(radLat1) *
      Math.cos(radLat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};

const toRad = (value) => (value * Math.PI) / 180;

export const getEntities = async () => {
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

  const res = await axios(config)
    .then((results) => results.data)
    .catch(function (error) {
      console.log(error);
    });

  return (await res) ? res : [];
};
