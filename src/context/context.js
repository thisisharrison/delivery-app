import React from "react";

const PathContext = React.createContext();

export const PathProvider = ({ children }) => {
  // set default value for path
  // setPath updater to be passed down to context provider
  const [path, setPath] = React.useState(null);

  return (
    <PathContext.Provider value={{ path, setPath }}>
      {children}
    </PathContext.Provider>
  );
};

export const usePathContext = () => React.useContext(PathContext);
export const PathConsumer = PathContext.Consumer;
