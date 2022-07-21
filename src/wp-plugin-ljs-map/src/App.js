import React from "react";
import { Provider } from "./hooks/useAppContext";
import Map from "./map";

const App = () => (
  <div className="App">
    <Provider>
      <Map />
    </Provider>
  </div>
);

export default App;
