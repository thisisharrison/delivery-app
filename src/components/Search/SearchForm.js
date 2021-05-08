import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Message from "../Message/Message";
import {
  postRoute,
  getRoute,
  testInProgress,
  testSuccessPath,
} from "../../util/server_api_util";
import PathContext from "../../context/context";

function SearchForm(props) {
  const [data, setData] = useState({ origin: "", destination: "" });
  const [message, setMessage] = useState({ status: "", message: "" });
  const { path, setPath } = useContext(PathContext);

  const handleChange = (e) => {
    setData(Object.assign({}, data, { [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postRoute(data)
      .then(async (res) => {
        const { data } = await testSuccessPath(res.data.token);

        if (data.status === "in progress") {
          setMessage({ status: data.status, message: "" });
        } else if (data.status === "failure") {
          setMessage({ status: data.status, message: data.error });
        } else if (data.status === "success") {
          setPath(data);
          setMessage({
            status: data.status,
            totalDistance: data.total_distance,
            totalTime: data.total_time,
          });
        }
      })
      .catch((e) => {
        setMessage({ status: e.status, message: e.error });
      });
  };

  const clearForm = (e) => {
    setData({ origin: "", destination: "" });
    setMessage({ status: "", message: "" });
    setPath({});
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
        <Button variant="success" type="submit" className="me-3">
          Submit
        </Button>
        <Button variant="primary" type="submit" className="me-3">
          Re-Submit
        </Button>
        <Button variant="dark" className="me-3" onClick={clearForm}>
          Reset
        </Button>
      </div>
    </Form>
  );
}

SearchForm.propTypes = {};

export default SearchForm;
