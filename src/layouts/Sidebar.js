import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of its props, so we can
// define it with a plain javascript function...
function Sidebar() {
  return (
    <div className='sidebar pull-left' style={{ margin: 20, width: 400 }}>
      <ListGroup>
        <ListGroupItem>Link 1</ListGroupItem>
        <ListGroupItem>Link 2</ListGroupItem>
        <ListGroupItem>Trigger an alert</ListGroupItem>
      </ListGroup>
    </div>
  )
}

export default Sidebar
