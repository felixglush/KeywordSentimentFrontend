import PropTypes from 'prop-types'
import React, { Component } from 'react'
import PostItem from "./PostItem.jsx"

class Keyword extends Component {
  render() {
    const postData = this.props.data.postData

    // todo: sent number of posts found via aws lambda function
    const numberOfPostsFound = postData.ids.length
    const indexValueToMap = Array.from(Array(numberOfPostsFound).keys())

    const posts = indexValueToMap.map((index) =>
      <PostItem
        filterKey={this.props.data.filterKey}
        key={postData.ids[index]}
        url={postData.urls[index]}
        upvotes={postData.upvotes[index]}
        creation_date={postData.creation_dates[index]}
        title={postData.title.text[index]}
        titleSentiment={postData.title.Sentiment[index]}
        titleSentimentScore={postData.title.SentimentScore[index]}
        body={postData.body.text[index]}
        bodySentiment={postData.body.Sentiment[index]}
        bodySentimentScore={postData.body.SentimentScore[index]}
      />
    )

    return (
      <div>
        <div>
          {this.props.data.keyword}
        </div>
        <div>
          {posts}
        </div>
      </div>
    )
  }
}

Keyword.propTypes = {
  data: PropTypes.object.isRequired
}

export default Keyword
