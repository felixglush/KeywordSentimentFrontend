import React, { Component } from 'react'
import Reddit from './Reddit.jsx'
class Source extends Component {

  render() {
    const source = this.props.source
    const result = this.props.result
    let data
    let component
    if (source === "reddit") {
      data = result[source]
      console.log("data", data)
      component = <Reddit data={data}/>
    }

    return (
      <div>
        {component}
      </div>
    )
  }
}

export default Source
