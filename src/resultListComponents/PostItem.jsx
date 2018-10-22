import React, { Component } from 'react'
import { ListGroupItem } from 'react-bootstrap'

class PostItem extends Component {
  render() {
    const post = this.props.post
    const score = this.props.score
    const magnitude = this.props.magnitude

    return (
      <ListGroupItem>
        <p>Text: {post}</p>
        <p>Score: {score}</p>
        <p>Magnitude: {magnitude}</p>
      </ListGroupItem>
    )

  }
}

export default PostItem
