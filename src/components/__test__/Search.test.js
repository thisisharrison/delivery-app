import { render } from "@testing-library/react";
import fireEvent from "@testing-library/user-event";
import SearchForm from "../Search/SearchForm";
import { PathProvider } from "../../context/context";

const ProviderWrapper = ({ children }) => {
  return <PathProvider>{children}</PathProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: ProviderWrapper, ...options });

describe("Search component", () => {
  it("can render properly", () => {
    const component = customRender(<SearchForm />);
    expect(component).toBeDefined();
  });

  it("should show empty origin and destination", () => {
    const { getByTestId } = customRender(<SearchForm />);
    expect(getByTestId(/search/i)).toHaveFormValues({
      origin: "",
      destination: "",
    });
  });

  it("should show submit and reset", () => {
    const { getByText } = customRender(<SearchForm />);
    expect(getByText(/submit/i)).toBeDefined();
    expect(getByText(/reset/i)).toBeDefined();
  });

  it("should update when user types", () => {
    const { getByRole } = customRender(<SearchForm />);
    const origin = getByRole("textbox", { name: /origin/i });
    const destination = getByRole("textbox", { name: /destination/i });
    fireEvent.type(origin, "innocentre");
    fireEvent.type(destination, "Hong Kong International Airport Terminal 1");

    expect(origin.value).toBe("innocentre");
    expect(destination.value).toBe(
      "Hong Kong International Airport Terminal 1"
    );
  });
});
