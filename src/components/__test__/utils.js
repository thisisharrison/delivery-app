import { render } from "@testing-library/react";
import { PathProvider } from "../../context/context";

const ProviderWrapper = ({ children }) => {
  return <PathProvider>{children}</PathProvider>;
};

/**
 * Provide wrapper to testing elements, such that they have ContextProvider
 */
const customRender = (ui, options) =>
  render(ui, { wrapper: ProviderWrapper, ...options });

export default customRender;
