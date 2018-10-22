import React, { Component } from 'react'
import PostItem from "./PostItem.jsx"
/*
Keyword [keyword list component]
  posts
*/

class Keyword extends Component {
  render() {
    const posts = this.props.data.posts
    const scores = this.props.data.scores
    const magnitudes = this.props.data.magnitudes

    const postItems = posts.map((post, index) =>
      <PostItem
        post={posts[index]}
        score={scores[index]}
        magnitude={magnitudes[index]}
      />
    )
    return (
      <div>
        <div>
          <p>Keyword: {this.props.keyword}</p>
        <div>
        </div>
          <ul>{postItems}</ul>
        </div>
      </div>

    )
  }
}

 export default Keyword
