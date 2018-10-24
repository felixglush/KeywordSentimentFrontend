import React, { Component } from 'react'
import { FormGroup, FormControl, InputGroup, Checkbox, Glyphicon,
  ListGroup, ListGroupItem } from 'react-bootstrap'

const SubredditInput = (props) => (
    <FormGroup>
      <InputGroup>
        <FormControl
          type="text"
          placeholder="Add subreddit to search..."
          onChange={event => {props.onChange(event.target.value)}}
        ></FormControl>
        <InputGroup.Addon onClick={() => props.onAddToSearch()}>
          <Glyphicon glyph="plus"></Glyphicon>
        </InputGroup.Addon>
      </InputGroup>
    </FormGroup>
)

class Controls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redditChecked: false,
      twitterChecked: false,
      subredditQuery: '',
      subredditsToSearch: [],
    }
    this.handleToggledReddit = this.handleToggledReddit.bind(this)
    this.handleToggledTwitter = this.handleToggledTwitter.bind(this)
    this.onSubredditInputChange = this.onSubredditInputChange.bind(this)
    this.onSubredditAdded = this.onSubredditAdded.bind(this)
  }

  componentDidUpdate() {
    this.props.onControlChange(this.state)
  }

  handleToggledReddit() {
    this.setState({redditChecked: !this.state.redditChecked, subredditsToSearch: []})
  }

  handleToggledTwitter() {
    this.setState({twitterChecked: !this.state.twitterChecked})
  }

  onSubredditInputChange(value) {
    this.setState({subredditQuery: value})
  }

  onSubredditAdded() {
    const listOfSubreddits = this.state.subredditsToSearch
    const queryToAdd = this.state.subredditQuery
    let add = true
    for (var i = 0; i < listOfSubreddits.length; i++) {
      if (listOfSubreddits[i] === queryToAdd) {
        add = false
        break
      }
    }

    if (add) {
      listOfSubreddits.push(queryToAdd)
      this.setState({subredditsToSearch: listOfSubreddits})
    }
  }

  render() {
    const subredditInput = this.state.redditChecked === false
                                ? null
                                : <SubredditInput
                                    onChange={this.onSubredditInputChange}
                                    onAddToSearch={this.onSubredditAdded}
                                  />

    const listOfSubredditButtons = this.state.subredditsToSearch.map((subreddit) =>
        <ListGroupItem key={subreddit}>{subreddit}</ListGroupItem>
    )

    return (
      <FormGroup>
        <div className="controls-component">
          <div>
            <p>Sources</p>
            <Checkbox
              checked={this.state.redditChecked}
              onChange={this.handleToggledReddit}>
              Reddit
            </Checkbox>
            <Checkbox
              checked={this.state.twitterChecked}
              onChange={this.handleToggledTwitter}>
              Twitter
            </Checkbox>
          </div>
          {subredditInput}
          <ListGroup>{listOfSubredditButtons}</ListGroup>
        </div>
      </FormGroup>
    )
  }
}

export default Controls
