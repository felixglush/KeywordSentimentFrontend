import React, { Component } from 'react'
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'
import '../App.css'

class SearchInput extends Component {
    constructor(props) {
      super(props)
      this.state = {
        query: ''
      }
    }

    onAddToSearch() {
      this.props.handleAddKeywordToSearch(this.state.query, "keyword")
    }

    render() {
      return (
        <div>
          <FormGroup className="search-component">
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Search keywords..."
                query={this.state.query}
                onChange={event => {this.setState({query: event.target.value})}}
              />
              <InputGroup.Addon onClick={() => this.onAddToSearch()}>
                <Glyphicon glyph="plus"></Glyphicon>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
        </div>
      )
    }
}

export default SearchInput
