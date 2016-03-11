import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions/Todos'

class App extends Component {
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

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
