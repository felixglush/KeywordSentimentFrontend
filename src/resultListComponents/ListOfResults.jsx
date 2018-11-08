import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Source from "./Source.jsx"

/* The structure for the list of results is as follows
ListOfResults [overall component]
  Source 1
    Keyword 1
      posts
    Keyword 2
      posts
  Source 2
    Keyword 1
      posts
    Keyword 2
      posts
*/

class ListOfResults extends Component {
  render() {
    console.log("ListOfResults sources", this.props.result.sources)
    const sourceList = this.props.result.sources.map((source) =>
      <ListGroupItem key={source}>
        <Source
          source={source}
          result={this.props.result}/>
      </ListGroupItem>
    )
    return (
      <ListGroup>{sourceList}</ListGroup>
    )
  }
}

ListOfResults.propTypes = {
  result: PropTypes.object.isRequired
}

export default ListOfResults
