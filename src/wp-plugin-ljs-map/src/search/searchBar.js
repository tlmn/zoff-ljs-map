import React from "react";
import axios from "axios";
import useAppContext from "../hooks/useAppContext";

const SearchBar = () => {
  const { setAppState } = useAppContext();

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
        map: {
          ...prev.map,
          center: [parseFloat(data.center[1]), parseFloat(data.center[0])],
          bounds: data.boundingBox,
        },
      }));
    } else {
      return null;
    }
  };

  return (
    <form onSubmit={(e) => handleSearch(e)}>
      <input placeholder="Gib deine Stadt ein" />
      <button type="submit">Ort suchen</button>
    </form>
  );
};

export default SearchBar;
