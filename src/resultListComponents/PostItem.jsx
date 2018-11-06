import React, { Component } from 'react'
import { ListGroupItem } from 'react-bootstrap'

class PostItem extends Component {
  render() {
    return (
      <ListGroupItem>
        {this.props.title}
      </ListGroupItem>
    )

  }
}

export default PostItem
