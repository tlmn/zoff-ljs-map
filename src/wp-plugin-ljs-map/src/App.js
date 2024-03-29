import React from "react";
import { Provider } from "./hooks/useAppContext";
import Map from "./map";
import Search from "./search";

const App = () => (
    <Provider>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "block", width: "100%", height: "100vh" }}>
          <Map />
        </div>
        <Search />
      </div>
    </Provider>
);

export default App;
