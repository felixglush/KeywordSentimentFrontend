import React, { Component } from 'react'
import { FormGroup, FormControl, InputGroup, Checkbox } from 'react-bootstrap'

class Controls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redditChecked: false,
      twitterChecked: false,
    }
    this.handleToggledReddit = this.handleToggledReddit.bind(this)
    this.handleToggledTwitter = this.handleToggledTwitter.bind(this)
  }

  handleToggledReddit() {
    this.setState({redditChecked: !this.state.redditChecked})
  }

  handleToggledTwitter() {
    this.setState({twitterChecked: !this.state.twitterChecked})
  }

  render() {
    return (
      <FormGroup className="pull-left">
        <div className="controls-component">
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
      </FormGroup>
    )
  }
}

export default Controls
