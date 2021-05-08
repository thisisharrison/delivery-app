import React from "react";

const PathContext = React.createContext({
  path: { path: [], totalDistance: null, totalTime: null },
  setPath: () => {},
});

export const PathProvider = PathContext.Provider;
export const PathConsumer = PathContext.Consumer;

export default PathContext;
