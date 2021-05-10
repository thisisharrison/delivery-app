import { render } from "@testing-library/react";
import Message from "../Message/Message";

describe("Message", () => {
  it("displays success variant", () => {
    const success = {
      status: "success",
      totalDistance: 100,
      totalTime: 200,
    };

    const { getByText, getByTestId } = render(<Message message={success} />);

    expect(getByText(/total distance/i)).toBeInTheDocument();
    expect(getByText(/total time/i)).toBeInTheDocument();
    expect(getByText(/100/i)).toBeInTheDocument();
    expect(getByText(/200/i)).toBeInTheDocument();
    expect(getByTestId(/message/i).className).toContain("alert-success");
  });

  it("displays error variant", () => {
    const error = {
      status: 500,
      error: "Internal Server Error",
    };

    const { getByText, getByTestId } = render(<Message message={error} />);

    expect(getByText(/error/i)).toBeInTheDocument();
    expect(getByText(/internal server error/i)).toBeInTheDocument();
    expect(getByTestId(/message/i).className).toContain("alert-danger");
  });

  it("displays failure variant", () => {
    const failure = {
      status: "failure",
      error: "not accessible",
    };

    const { getByText, getByTestId } = render(<Message message={failure} />);

    expect(getByText(/error/i)).toBeInTheDocument();
    expect(getByText(/not accessible/i)).toBeInTheDocument();
    expect(getByTestId(/message/i).className).toContain("alert-danger");
  });

  it("displays in progress variant", () => {
    const inProgress = {
      status: "in progress",
    };

    const { getByText, getByTestId } = render(<Message message={inProgress} />);

    expect(getByText(/status/i)).toBeInTheDocument();
    expect(getByText(/in progress/i)).toBeInTheDocument();
    expect(getByTestId(/message/i).className).toContain("alert-warning");
  });
});
