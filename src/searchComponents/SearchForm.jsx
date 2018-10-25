import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import SearchInput from './SearchInput.jsx'
import Controls from './Controls.jsx'
import EditableListOfT from './EditableListOfT.jsx'

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

    this.props.onSearch(result)
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
