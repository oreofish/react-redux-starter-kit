import React, { Component, PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import MainSection from '../components/MainSection'

class TodoList extends Component {
  render() {
    const { todos, actions } = this.props
    return (
      <div>
        <MainSection todos={todos} actions={actions} />
        <LinkContainer to='todos/new'>
          <Button>Add new</Button>
        </LinkContainer>
      </div>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.array.isRequired
}

export default TodoList
