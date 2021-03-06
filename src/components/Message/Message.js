import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";

// message component
// receives props from search form
function Message({ message }) {
  const [variant, setVariant] = useState("light");
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (!message) {
      setInfo({});
      setVariant("light");
      return;
    }
    if (message.status === "failure" || message.status === 500) {
      setVariant("danger");
      setInfo({ Error: message.error });
    } else if (message.status === "success") {
      setVariant("success");
      setInfo({
        "Total Distance": message.totalDistance,
        "Total Time": message.totalTime,
      });
    } else if (message.status === "in progress") {
      setVariant("warning");
      setInfo({
        Status: message.status,
      });
    }
  }, [message]);

  if (!message) {
    return null;
  } else {
    return (
      <div>
        <Alert variant={variant} data-testid="message">
          <ul>
            {Object.keys(info).map((key) => {
              return (
                <li key={key}>
                  {key}: {info[key]}
                </li>
              );
            })}
          </ul>
        </Alert>
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.shape({
    status: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    totalDistance: PropTypes.number,
    totalTime: PropTypes.number,
    error: PropTypes.string,
  }),
};

export default Message;
