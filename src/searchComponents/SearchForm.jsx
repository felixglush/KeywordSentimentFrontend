import React, { Component } from 'react'
import { Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap'
import SearchInput from './SearchInput.jsx'
import Controls from './Controls.jsx'
import EditableListOfT from './EditableListOfT.jsx'

const NameInput = (props) => (
    <FormGroup>
      <InputGroup>
        <FormControl
          type="text"
          placeholder="Campaign Name..."
          onChange={event => {props.onChange(event.target.value)}}
        ></FormControl>
      </InputGroup>
    </FormGroup>
)

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      keywords: [],
      subredditsToSearch: [],
      searchReddit: false,
      searchTwitter: false
    }

    this.handleAddStringToSearch = this.handleAddStringToSearch.bind(this)
    this.handleChangedControls = this.handleChangedControls.bind(this)
    this.create = this.create.bind(this)
  }

  create() {
    const campaign = {
      name: this.state.name,
      keywords: this.state.keywords
    }

    let sources = []
    let subreddits = []
    if (this.state.searchTwitter) sources.push("twitter")
    if (this.state.searchReddit) {
      sources.push("reddit")
      subreddits = this.state.subredditsToSearch
      campaign["subreddits"] = this.state.subredditsToSearch
    }

    campaign["sources"] = sources

    this.onCreate(campaign)
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

  campaignNameChange(name) {
    // make sure it is unique
    let unique = true
    for (var takenName in this.props.names) {
      if (takenName === name) {
        console.log("Name is taken.")
        unique = false
      }
    }

    if (unique) this.setState({ name })
  }

  render() {
    const subredditList = this.state.searchReddit
                        ? <EditableListOfT items={this.state.subredditsToSearch}/>
                        : null;

    return (
      <div>
        <NameInput onChange={this.campaignNameChange}/>
        <div className="row">
          <div className="col-md-6">
            <SearchInput handleAddKeywordToSearch={this.handleAddStringToSearch}/>
            <EditableListOfT items={this.state.keywords}/>
          </div>


          <div className="col-md-6">
            <Controls
              handleAddSubredditToSearch={this.handleAddStringToSearch}
              onControlChange={this.handleChangedControls}
              searchSettings={this.state.searchSettings}/>
            {subredditList}
          </div>
        </div>

        <Button
          bsStyle="primary" bsSize="large"
          onClick={this.create}>
          Create
        </Button>
      </div>
    )
  }
}

export default SearchForm
