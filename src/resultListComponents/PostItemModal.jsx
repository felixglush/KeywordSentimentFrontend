import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import '../App.css'

const TextSentimentBreakdown = (props) => (
    <div className="text-sentiment-breakdown">
      <div className="row">
        <div className="col-sm-6">
          Positive: {props.positive.toFixed(4)}
        </div>

        <div className="col-sm-6">
          Mixed: {props.mixed.toFixed(4)}
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          Negative: {props.negative.toFixed(4)}
        </div>

        <div className="col-sm-6">
          Neutral: {props.neutral.toFixed(4)}
        </div>
      </div>
    </div>
)

class PostItemModal extends Component {
  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.props.close()
  }

  render() {
    return (
      <Modal show={this.props.showItemModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h4>Title sentiment</h4>
          {this.props.titleSentiment}

          <h4>Title sentiment breakdown</h4>
          <TextSentimentBreakdown
            mixed={this.props.titleSentimentScore.Mixed}
            positive={this.props.titleSentimentScore.Positive}
            negative={this.props.titleSentimentScore.Negative}
            neutral={this.props.titleSentimentScore.Neutral}
          />

          <h4>Body text</h4>
          {this.props.body}

          <h4>Body sentiment</h4>
          {this.props.bodySentiment}

          <h4>Body sentiment breakdown</h4>
          <TextSentimentBreakdown
            mixed={this.props.bodySentimentScore.Mixed}
            positive={this.props.bodySentimentScore.Positive}
            negative={this.props.bodySentimentScore.Negative}
            neutral={this.props.bodySentimentScore.Neutral}
          />

          <h4>Link to post</h4>
          <a href={this.props.url}>link</a>

          <h4>Post type</h4>
          {this.props.filterKey}

          <h4>Popularity</h4>
          {this.props.upvotes}

          <h4>Post date</h4>
          {this.props.creation_date.toString()}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default PostItemModal
