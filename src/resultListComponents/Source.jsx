import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Reddit from './Reddit.jsx'
import Twitter from './Twitter.jsx'

class Source extends Component {
  render() {
    const source = this.props.source
    const result = this.props.result
    let data
    let component
    if (source === "reddit") {
      data = result[source]
      component = <Reddit data={data}/>
    } else if (source === "twitter") {
      data = result[source]
      component = <Twitter data={data}/>
    }

    return (
      <div>
        {component}
      </div>
    )
  }
}

Source.propTypes = {
  result: PropTypes.object.isRequired,
  source: PropTypes.string.isRequired
}

export default Source
