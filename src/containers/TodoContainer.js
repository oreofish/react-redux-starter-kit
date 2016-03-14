import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TodoActions from '../actions/Todos'

class TodoContainer extends Component {
  render() {
    return (
      <div>
        <h1>todos</h1>
        {this.props.children && React.cloneElement(this.props.children, {
          todos: this.props.todos,
          actions: this.props.actions
        })}
      </div>
    )
  }
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
)(TodoContainer)
