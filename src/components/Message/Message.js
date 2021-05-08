import React from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";

function Message({ message = null }) {
  if (!message) return;

  const renderMessage = () => {
    if (message.totalDistance) {
      return (
        <ul>
          <li>total distance: {message.totalDistance}</li>
          <li>total time: {message.totalTime}</li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li>{JSON.stringify(message, undefined)}</li>
        </ul>
      );
    }
  };
  return (
    <div>
      <Alert variant="light">{renderMessage()}</Alert>
    </div>
  );
}

Message.propTypes = {};

export default Message;
