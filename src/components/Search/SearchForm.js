import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Message from "../Message/Message";
import {
  postRoute,
  getRoute,
  testServerError,
  testSubmitSuccess,
  testSubmitInProgress,
  testGetRouteSuccess,
  testGetRouteFailure,
} from "../../util/server_api_util";
import PathContext from "../../context/context";

function SearchForm(props) {
  const [data, setData] = useState({ origin: "", destination: "" });
  const [message, setMessage] = useState(null);
  const [resubmit, setResubmit] = useState(false);
  const { _, setPath } = useContext(PathContext);

  const handleChange = (e) => {
    setData(Object.assign({}, data, { [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    testSubmitSuccess(data)
      .then(async (res) => {
        const { data } = await testGetRouteSuccess(res.data.token);

        if (data.status === "in progress") {
          setMessage({ status: data.status });
        } else if (data.status === "failure") {
          setMessage(Object.assign({}, data));
          setResubmit(false);
        } else if (data.status === "success") {
          setPath(Object.assign({}, data));
          setMessage({
            status: data.status,
            totalDistance: data.total_distance,
            totalTime: data.total_time,
          });
          setResubmit(false);
        }
      })
      .catch((e) => {
        setMessage({ status: e.response.status, error: e.response.data });
        setResubmit(true);
      });
  };

  const clearForm = (e) => {
    setData({ origin: "", destination: "" });
    setMessage(null);
    setPath(null);
    setResubmit(false);
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
          <Button variant="success" type="submit" className="me-3">
            Submit
          </Button>
        )}
        {resubmit && (
          <Button variant="primary" type="submit" className="me-3">
            Re-Submit
          </Button>
        )}
        <Button variant="dark" className="me-3" onClick={clearForm}>
          Reset
        </Button>
      </div>
    </Form>
  );
}

SearchForm.propTypes = {};

export default SearchForm;
