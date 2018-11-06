import React, { Component } from 'react'
import PostItem from "./PostItem.jsx"
/*
Keyword [keyword list component]
  posts
*/

class Keyword extends Component {


  render() {
    const filterKey = this.props.data.filterKey
    const keyword = this.props.data.keyword
    const postData = this.props.data.postData

    const numberOfPostsFound = postData.urls.length
    console.log("length", numberOfPostsFound)

    const titles = postData.title.text.map((title) =>
      <PostItem key={title} title={title}/>
    )

    return (
      <div>
        <div>
          {keyword}
        </div>
        <div>
          {titles}
        </div>
      </div>
    )
  }
}

 export default Keyword
