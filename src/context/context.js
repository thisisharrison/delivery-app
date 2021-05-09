import React from "react";

// set default value for path
// setPath updater to be passed down to context provider
const PathContext = React.createContext({
  path: null,
  setPath: () => {},
});

export const PathProvider = PathContext.Provider;
export const PathConsumer = PathContext.Consumer;

export default PathContext;
