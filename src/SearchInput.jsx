import React, { Component } from 'react'
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap'

class SearchInput extends Component {
    constructor(props) {
      super(props)
      this.state = {
        query: ''
      }
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

    render() {
      return (
        <FormGroup className="search-component">
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search keywords..."
              query={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
      )
    }
}

export default SearchInput
