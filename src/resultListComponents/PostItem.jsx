import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ListGroupItem } from 'react-bootstrap'
import PostItemModal from './PostItemModal.jsx'
class PostItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showItemModal: false
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ showItemModal: false });
  }

  handleShow() {
    this.setState({ showItemModal: true });
  }

  render() {
    const date = new Date(this.props.creation_date)
    const postItemModal = this.state.showItemModal
          ? <PostItemModal
              close={this.handleClose}
              showItemModal={this.state.showItemModal}
              filterKey={this.props.filterKey}
              id={this.props.key}
              url={this.props.url}
              upvotes={this.props.upvotes}
              creation_date={date}
              title={this.props.title}
              titleSentiment={this.props.titleSentiment}
              titleSentimentScore={this.props.titleSentimentScore}
              body={this.props.body}
              bodySentiment={this.props.bodySentiment}
              bodySentimentScore={this.props.bodySentimentScore}
            />
          : <span/>
    return (
      <div>
        <ListGroupItem onClick={this.handleShow}>
          {this.props.title}
        </ListGroupItem>
        {postItemModal}
      </div>
    )

  }
}

PostItem.propTypes = {
  title: PropTypes.string.isRequired,
  titleSentiment: PropTypes.string.isRequired,
  titleSentimentScore: PropTypes.object.isRequired,
  body: PropTypes.string,
  bodySentiment: PropTypes.string,
  bodySentimentScore: PropTypes.object
}

export default PostItem
