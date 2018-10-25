import React, { Component } from 'react'
import { FormGroup, FormControl, InputGroup, Checkbox, Glyphicon } from 'react-bootstrap'

const SubredditInput = (props) => (
    <FormGroup>
      <InputGroup>
        <FormControl
          type="text"
          placeholder="Add subreddit to search..."
          onChange={event => {props.onChange(event.target.value)}}
        ></FormControl>
        <InputGroup.Addon onClick={() => props.onAddToSearch(props.subredditQuery, "subreddit")}>
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
  }

  componentDidUpdate() {
    console.log("controls changed")
    //this.props.onControlChange(this.state)
  }

  handleToggledReddit() {
    this.setState({redditChecked: !this.state.redditChecked, subredditsToSearch: []},
      function updatedState() {
        this.props.onControlChange(this.state)
      }
    )
  }

  handleToggledTwitter() {
    this.setState({twitterChecked: !this.state.twitterChecked},
      function updatedState() {
        this.props.onControlChange(this.state)
      }
    )
  }

  onSubredditInputChange(value) {
    this.setState({subredditQuery: value},
      function updatedState() {
        this.props.onControlChange(this.state)
    })
  }

  isEmpty(string) {
      return (string.length === 0 || !string.trim());
  };


  render() {
    const subredditInput = this.state.redditChecked === false
                                ? null
                                : <SubredditInput
                                    onChange={this.onSubredditInputChange}
                                    subredditQuery={this.state.subredditQuery}
                                    onAddToSearch={this.props.handleAddSubredditToSearch}/>

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
        </div>
      </FormGroup>
    )
  }
}

export default Controls
