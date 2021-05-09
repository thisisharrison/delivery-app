import React, { useState, useContext } from "react";
import Message from "../Message/Message";
// importing context for updating
import PathContext from "../../context/context";
// importing the api axios calls
import {
  postRoute,
  getRoute,
  testServerError,
  testSubmitSuccess,
  testGetRouteInProgress,
  testGetRouteSuccess,
  testGetRouteFailure,
} from "../../util/server_api_util";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// search component
function SearchForm() {
  // setting states
  const [data, setData] = useState({ origin: "", destination: "" });
  const [message, setMessage] = useState(null);
  const [resubmit, setResubmit] = useState(false);
  const [disable, setDisable] = useState(false);
  // receives updater function from the context
  const { _, setPath } = useContext(PathContext);

  // handles form change
  const handleChange = (e) => {
    setData(Object.assign({}, data, { [e.target.name]: e.target.value }));
  };

  // handle submission of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);
    // axios inital call with origin and destination data
    postRoute(data)
      .then(async (res) => {
        // subsequent call with token to retrieve path
        let { data } = await getRoute(res.data.token);
        // retry logic while status is in progress
        while (data.status === "in progress") {
          // update the message state
          setMessage({ status: data.status });
          // disable submit buttons
          setDisable(true);
          // rety API call
          let response = await getRoute(res.data.token);
          // update data variable
          data = response.data;
        }

        if (data.status === "failure") {
          // failure message handling
          setMessage(Object.assign({}, data));
        } else if (data.status === "success") {
          // update context
          setPath(Object.assign({}, data));
          // success message handling
          setMessage({
            status: data.status,
            totalDistance: data.total_distance,
            totalTime: data.total_time,
          });
        }
        setResubmit(false);
        setDisable(false);
      })
      .catch((e) => {
        // error message handling
        setMessage({ status: e.response.status, error: e.response.data });
        setResubmit(true);
        setDisable(false);
      });
  };

  // handle reset form
  const clearForm = (e) => {
    setData({ origin: "", destination: "" });
    setMessage(null);
    // update context
    setPath(null);
    setResubmit(false);
    setDisable(false);
  };

  return (
    <Form className="mb-5" onSubmit={handleSubmit}>
      <Form.Group controlId="origin">
        <Form.Label>Starting Location</Form.Label>
        <Form.Control
          required
          placeholder="Enter starting location"
          type="text"
          name="origin"
          onChange={handleChange}
          value={data.origin}
        />
      </Form.Group>

      <Form.Group controlId="destination">
        <Form.Label>Drop-off Point</Form.Label>
        <Form.Control
          required
          placeholder="Enter drop-off location"
          type="text"
          name="destination"
          onChange={handleChange}
          value={data.destination}
        />
      </Form.Group>

      <div className="my-5">
        <Message message={message} />
      </div>

      <div className="d-flex justify-content-start">
        {!resubmit && (
          <Button
            variant="success"
            type="submit"
            className="me-3"
            disabled={disable}
          >
            Submit
          </Button>
        )}
        {resubmit && (
          <Button
            variant="primary"
            type="submit"
            className="me-3"
            disabled={disable}
          >
            Re-Submit
          </Button>
        )}
        <Button
          variant="dark"
          className="me-3"
          onClick={clearForm}
          disabled={disable}
        >
          Reset
        </Button>
      </div>
    </Form>
  );
}

export default SearchForm;
