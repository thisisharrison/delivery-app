import React from "react";
import Search from "./Search/SearchForm";
import Map from "./Map/Map";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function App() {
  return (
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
  );
}
