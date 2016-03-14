import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
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

export default TodoList
