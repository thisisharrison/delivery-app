import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { PathProvider, PathConsumer } from "../../context/context";

describe("initial state", () => {
  it("has null as default values for path", () => {
    const { getByText } = render(
      <PathProvider>
        <PathConsumer>
          {(value) => <div>{JSON.stringify(value.path)}</div>}
        </PathConsumer>
      </PathProvider>
    );
    expect(getByText("null")).toBeTruthy();
  });
});

describe("path change", () => {
  it("sets path to response", () => {
    const response = {
      status: "success",
      path: [
        ["22.372081", "114.107877"],
        ["22.326442", "114.167811"],
        ["22.284419", "114.159510"],
      ],
      total_distance: 20000,
      total_time: 1800,
    };
    const { getByText } = render(
      <PathProvider>
        <PathConsumer>
          {(value) => (
            <>
              <div>{JSON.stringify(value.path)}</div>
              <button onClick={(e) => value.setPath(response)}>Update</button>
            </>
          )}
        </PathConsumer>
      </PathProvider>
    );

    expect(getByText("null")).toBeTruthy();

    fireEvent.click(getByText("Update"));

    expect(getByText(JSON.stringify(response))).toBeTruthy();
  });
});
