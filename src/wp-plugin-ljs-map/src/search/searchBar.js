import React, { useRef } from "react";
import useAppContext from "../hooks/useAppContext";
import { getLocation } from "../lib/lib";

const SearchBar = () => {
  const { setAppState } = useAppContext();

  const inputRef = useRef(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    const queryString = inputRef.current.value; // get the input string from the input field

    const responseData = await getLocation(queryString); // get location data from geocoding API

    if (responseData.data.status !== "ok") return; // if API response is faulty return

    const {
      data: { data: location },
    } = responseData;
    
    // set retrieved location data
    setAppState((prev) => ({
      ...prev,
      map: {
        ...prev.map,
        center: [
          parseFloat(location.center[1]),
          parseFloat(location.center[0]),
        ],
        bounds: location.boundingBox,
      },
    }));
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <form onSubmit={(e) => handleSearch(e)}>
          <input placeholder="Gib deine Stadt ein" ref={inputRef} />
          <button type="submit">Ort suchen</button>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
