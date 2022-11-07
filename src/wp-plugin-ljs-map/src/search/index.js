import React from "react";
import Results from "./results";
import SearchBar from "./searchBar";

const Search = () => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <div>
      <SearchBar />
    </div>
    <div>
      <Results />
    </div>
  </div>
);

export default Search;
