import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Keyword from './Keyword.jsx'

class Reddit extends Component {
  render() {
    const data = this.props.data
    const subList = data["subreddits"]

    let listOfKeywords = []
    subList.map((subreddit) => {
      const subredditData = data[subreddit]
      for (var filterKey in subredditData) {
        if (subredditData.hasOwnProperty(filterKey)) {
          const filter = subredditData[filterKey] // i.e. hot, new, popular, etc
          for (var keyword in filter) {
            if (filter.hasOwnProperty(keyword)) {
              // const keywordData = filter[keyword]
              listOfKeywords.push({filterKey, keyword, postData: filter[keyword]})
            }
          }
        }
      }
      return listOfKeywords
    })

    const postListComponent = listOfKeywords.map((keywordData) =>
      <Keyword key={keywordData.keyword} data={keywordData}/>
    )

    return (
      <div>
        <p>Reddit</p>
        {postListComponent}
      </div>
    )
  }
}

Reddit.propTypes = {
  data: PropTypes.object.isRequired
}

export default Reddit
