import React, { Component } from 'react'
import { ListGroupItem } from 'react-bootstrap'

class PostItem extends Component {
  render() {
    const post = this.props.post
    const sentiment = this.props.score
    const sentimentScore = this.props.sentiementScore

    return (
      <ListGroupItem>
        <p>Text: {post}</p>
        <p>Score: {sentiment}</p>

      </ListGroupItem>
    )

  }
}

export default PostItem
