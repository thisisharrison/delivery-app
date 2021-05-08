import React from "react";

const PathContext = React.createContext({
  path: {},
  setPath: () => {},
});

export const PathProvider = PathContext.Provider;
export const PathConsumer = PathContext.Consumer;

export default PathContext;
