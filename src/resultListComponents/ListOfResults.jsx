import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Keyword from "./Keyword.jsx"
/*
const result = {
  keywords: ["apple", "tim hortons"],
  sources: ["reddit"],
  subreddits: ["r/BizNews"],
  "apple": {
    posts: ["apple is great", "apple is awesome"],
    scores: [1.0, 0.5],
    magnitudes: [-0.5, 0.75],
  },
  "tim hortons": {
    posts: ["tim's is the best!!"],
    scores: [1.0],
    magnitudes: [1.0],
  }
}
*/

/* The structure for the list of results is as follows
ListOfResults [overall component]
  Keyword 1 [keyword list component]
    Source 1
      posts
    Source 2
      posts
  Keyword 2 [keyword list component]
    Source 1
      posts
    Source 2
      posts
*/

class ListOfResults extends Component {

  render() {
    const result = this.props.result
    const keywords = this.props.result.keywords // a list of keywords

    const keywordList = keywords.map((keyword) =>
      <ListGroupItem key={keyword}>
        <Keyword
          keyword={keyword}
          data={result[keyword]}
        />
      </ListGroupItem>
    )

    return (
      <ListGroup>{keywordList}</ListGroup>
    )
  }
}

export default ListOfResults
