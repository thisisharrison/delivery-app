import React, { useState } from "react";
import Search from "./Search/SearchForm";
import Map from "./Map/Map";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { PathProvider } from "../context/context";

export default function App() {
  // The path entire state is passed to the provider
  const [path, setPath] = useState({});
  const value = { path, setPath };

  return (
    <PathProvider value={value}>
      <Container fluid>
        <Row>
          <Col xs={12} md={4}>
            <Search />
          </Col>
          <Col xs={12} md={8}>
            <Map />
          </Col>
        </Row>
      </Container>
    </PathProvider>
  );
}
