import React from 'react'
import Search from './Search/SearchForm'
import Map from './Map/Map'
import {MapErrorBoundary, ErrorFallBackComponent} from './Map/MapErrorBoundary'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {PathProvider} from '../context/context'

export default function App() {
  return (
    // The path entire state is passed to the provider
    <PathProvider>
      <Container fluid>
        <Row>
          <Col xs={12} md={4}>
            <Search />
          </Col>
          <Col xs={12} md={8}>
            {/* fails with the Google Map Error */}
            <MapErrorBoundary ErrorFallBackComponent={ErrorFallBackComponent}>
              <Map />
            </MapErrorBoundary>
          </Col>
        </Row>
      </Container>
    </PathProvider>
  )
}
