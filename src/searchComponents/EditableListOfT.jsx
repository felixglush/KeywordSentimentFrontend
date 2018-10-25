import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

class EditableListOfT extends Component {
  render() {
    const items = this.props.items.map((item) =>
      <ListGroupItem key={item}>{item}</ListGroupItem>
    )
    return (
      <ListGroup>
        {items}
      </ListGroup>
    )
  }
}

export default EditableListOfT
