import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Keyword from './Keyword.jsx'
class Reddit extends Component {
  render() {
    const data = this.props.data
    const subList = data["subreddits"]

    const subredditList = subList.map((subreddit) => {
      const subredditData = data[subreddit]
      for (var filterKey in subredditData) {
        if (subredditData.hasOwnProperty(filterKey)) {
          const filter = subredditData[filterKey] // i.e. hot, new, popular, etc
          for (var keyword in filter) {
            if (filter.hasOwnProperty(keyword)) {
              const keywordData = filter[keyword]
              console.log(keywordData)
            }
          }
        }
      }
      return true
    })

    return (
      <div>
        <p>Reddit</p>
        {subredditList}
      </div>
    )
  }
}

export default Reddit
