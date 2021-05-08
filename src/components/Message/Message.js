import React from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";

function Message(props) {
  return (
    <div>
      <Alert variant="secondary">Message to user</Alert>
    </div>
  );
}

Message.propTypes = {};

export default Message;
