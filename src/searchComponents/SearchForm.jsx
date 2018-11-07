import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import SearchInput from './SearchInput.jsx'
import Controls from './Controls.jsx'
import EditableListOfT from './EditableListOfT.jsx'
import { callLambda } from '../aws.js'

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keywords: [],
      subredditsToSearch: [],
      searchReddit: false,
      searchTwitter: false
    }

    this.handleAddStringToSearch = this.handleAddStringToSearch.bind(this)
    this.handleChangedControls = this.handleChangedControls.bind(this)
    this.search = this.search.bind(this)
  }

  search() {
    const resultJSON = { "sources": [ "reddit" ], "keywords": [ "keyword1", "keyword2" ], "reddit": { "subreddits": ["subreddit1"], "subreddit1": { "hot": { "keyword1": { "urls": ["wwww.reddit.com", "www.reddit.com"], "ids": [1, 2], "upvotes": [1, 2], "creation_dates": [123, 312], "title": { "text": [ "title1, key1", "title1, key1" ], "Sentiment": [ "NEUTRAL", "POSITIVE" ], "SentimentScore": [ { "Mixed": 0.0145, "Positive": 0.315, "Neutral": 0.598, "Negative": 0.070 }, { "Mixed": 0.0145, "Positive": 0.315, "Neutral": 0.598, "Negative": 0.070 } ] }, "body": { "text": ["body1", "body2"], "Sentiment": ["NEUTRAL", "POSITIVE"], "SentimentScore": [ { "Mixed": 0.0145, "Positive": 0.315, "Neutral": 0.598, "Negative": 0.070 }, { "Mixed": 0.0145, "Positive": 0.315, "Neutral": 0.598, "Negative": 0.070 }] } }, "keyword2": { "urls": ["wwww.reddit.com", "www.reddit.com"], "ids": [3, 4], "upvotes": [6, 2], "creation_dates": [123, 312], "title": { "text": [ "title1, key2", "title2, key2" ], "Sentiment": [ "NEUTRAL", "POSITIVE" ], "SentimentScore": [ { "Mixed": 0.0145, "Positive": 0.315, "Neutral": 0.598, "Negative": 0.070 }, { "Mixed": 0.0145, "Positive": 0.315, "Neutral": 0.598, "Negative": 0.070 }] }, "body": { "text": ["body1", "body2"], "Sentiment": ["NEUTRAL", "POSITIVE"], "SentimentScore": [ { "Mixed": 0.0145, "Positive": 0.315, "Neutral": 0.598, "Negative": 0.070 }, { "Mixed": 0.0145, "Positive": 0.315, "Neutral": 0.598, "Negative": 0.070 }] } } }, "new": {} } } }

    const payLoadObject = {
      "keywords_list": this.state.keywords,
      "subreddits_list": this.state.subredditsToSearch,
      "sources": ["reddit"]
    }

    callLambda(JSON.stringify(payLoadObject), (result) => {
      const resultObj = JSON.parse(JSON.parse(result.body).result)
      this.props.onSearch(resultObj)
    })
  }

  isEmpty(string) {
      return (string.length === 0 || !string.trim());
  }

  handleAddStringToSearch(string, type) {
    let list
    const isKeyword = type === "keyword"
    const isSubreddit = type === "subreddit"
    if (isKeyword) {
      list = this.state.keywords
    } else if (isSubreddit) {
      list = this.state.subredditsToSearch
    }

    if (!this.isEmpty(string)) {
      let add = true
      for (var i = 0; i < list.length; i++) {
        if (list[i] === string) {
          add = false
          break
        }
      }

      if (add) {
        list.push(string)
        if (isKeyword) {
          this.setState({keywords: list})
        } else if (isSubreddit) {
          this.setState({subredditsToSearch: list})
        }
      }
    }
  }

  handleChangedControls(newControls) {
    this.setState({
      searchReddit: newControls.redditChecked,
      searchTwitter: newControls.twitterChecked,
      subredditsToSearch: newControls.subredditsToSearch
    })
  }

  render() {
    const subredditList = this.state.searchReddit
                        ? <EditableListOfT items={this.state.subredditsToSearch}/>
                        : null;
                        console.log("subredditList", subredditList)

    return (
      <div>
        <div className="row">
          <div className="col-md-5">
            <SearchInput handleAddKeywordToSearch={this.handleAddStringToSearch}/>
            <EditableListOfT items={this.state.keywords}/>
          </div>


          <div className="col-md-5">
            <Controls
              handleAddSubredditToSearch={this.handleAddStringToSearch}
              onControlChange={this.handleChangedControls}
              searchSettings={this.state.searchSettings}/>
            {subredditList}
          </div>

          <div className="col-md-2">
            <Button
              bsStyle="primary" bsSize="large"
              onClick={this.search}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchForm
