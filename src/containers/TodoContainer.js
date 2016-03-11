import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Edit from './TodoEdit'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'

class TodoContainer extends Component {
  render() {
    const { todos, actions } = this.props
    return (
      <div>
        <h1>todos</h1>
        {this.props.children}
      </div>
    )
  }
}

export default TodoContainer
