import React, {Component} from 'react'

function ErrorFallBackComponent({error}) {
  return (
    <div role="alert">
      There was an error:
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
}

class MapErrorBoundary extends Component {
  state = {error: null}

  static getDerivedStateFromError(error) {
    return {error}
  }

  render() {
    const {error} = this.state
    if (error) {
      return <this.props.ErrorFallBackComponent error={error} />
    }
    // render children props if no errors
    return this.props.children
  }
}

export {MapErrorBoundary, ErrorFallBackComponent}
