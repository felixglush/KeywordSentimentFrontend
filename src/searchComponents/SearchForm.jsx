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
    const payload = {
      "keywords_list": this.state.keywords,
      "subreddits_list": this.state.subredditsToSearch,
      "sources": ["reddit"]
    }

    const mockPayload = {
      "keywords_list": ["the"],
      "subreddits_list": ["uwaterloo"],
      "sources": ["reddit"]
    }

    callLambda(JSON.stringify(mockPayload), (result) => {
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
