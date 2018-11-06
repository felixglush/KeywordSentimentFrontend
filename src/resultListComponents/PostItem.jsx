import React, { Component } from 'react'
import { ListGroupItem } from 'react-bootstrap'

class PostItem extends Component {
  render() {
    const filterKey = this.props.filterKey
    const id = this.props.key
    const url = this.props.url
    const upvotes = this.props.upvotes
    const creation_date = this.props.creation_date
    const title = this.props.title
    const titleSentiment = this.props.titleSentiment
    const titleSentimentScore = this.props.titleSentimentScore
    const body = this.props.body
    const bodySentiment = this.props.bodySentiment
    const bodySentimentScore = this.props.bodySentimentScore

    return (
      <ListGroupItem>
        <div>
          {title}
        </div>
        <div>
          {body}
        </div>
      </ListGroupItem>
    )

  }
}

export default PostItem
