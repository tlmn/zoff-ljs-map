import React from "react";
import axios from "axios";
import useAppContext from "../hooks/useAppContext";

const SearchBar = () => {
  const {
    appState: {
      map: { center },
    },
    setAppState,
  } = useAppContext();
  const handleSearch = async (e) => {
    e.preventDefault();

    const queryString = e.target[0].value;
    const res = await axios.get(
      "https://zoff-ljs-wp-map-geocder.onrender.com/getLocation",
      { params: { q: queryString } }
    );

    if (res.data.status === "ok") {
      let data = res.data.data;
      setAppState((prev) => ({
        ...prev,
        map: { ...prev.map, center: [data.lat, data.lon] },
      }));
    } else {
      return null;
    }
  };

  return (
    <form onSubmit={(e) => handleSearch(e)}>
      <input placeholder="Gib deine Stadt ein"/>
      <button type="submit">suchen</button>
    </form>
  );
};

export default SearchBar;
