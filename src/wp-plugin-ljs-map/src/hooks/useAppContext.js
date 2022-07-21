import React, { useState } from "react";
import { createContext, useContext } from "react";

export const initialState = {
  map: {
    bounds: [
      [47.189, 5.317],
      [55.0909, 15.512],
    ],
    center: [51.1657, 10.4515],
  },
  currentLocation: {
    bundesland: "",
    location: ""
  },
  entities: {}
};

const context = createContext(initialState);

export const Provider = ({ children }) => {
  const { Provider } = context;
  const [appState, setAppState] = useState(initialState);

  return <Provider value={{ appState, setAppState }}>{children}</Provider>;
};

const useAppContext = () => useContext(context);

export default useAppContext;
