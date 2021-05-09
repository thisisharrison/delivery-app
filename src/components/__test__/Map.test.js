import { screen } from "@testing-library/react";
import Map from "../Map/Map";
import { customRender } from "./Search.test";

describe("Map", () => {
  it("renders Map", () => {
    customRender(<Map />);
    const el = screen.getByTestId(/map/i);
    expect(el).toBeInTheDocument();
  });
});
