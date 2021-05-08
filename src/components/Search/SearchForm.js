import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Message from "../Message/Message";

function SearchForm(props) {
  return (
    <Form>
      <Form.Group controlId="startingLocation">
        <Form.Label>Starting Location</Form.Label>
        <Form.Control
          required
          placeholder="Enter starting location"
          type="text"
        />
      </Form.Group>

      <Form.Group controlId="dropOffLocation">
        <Form.Label>Drop-off Point</Form.Label>
        <Form.Control
          required
          placeholder="Enter drop-off location"
          type="text"
        />
      </Form.Group>

      <div className="my-5">
        <Message />
      </div>

      <div className="d-flex justify-content-start">
        <Button variant="success" type="submit" className="me-3">
          Submit
        </Button>
        <Button variant="primary" type="submit" className="me-3">
          Re-Submit
        </Button>
        <Button variant="dark" className="me-3">
          Reset
        </Button>
      </div>
    </Form>
  );
}

SearchForm.propTypes = {};

export default SearchForm;
