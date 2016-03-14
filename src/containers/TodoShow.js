import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Edit from './TodoEdit'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions/Todos'

class TodoShow extends Component {
  render() {
    const { params, todos, actions } = this.props
    return (
      <div>
        {todos[params.id].text}
      </div>
    )
  }
}

TodoShow.propTypes = {
  params: PropTypes.object.isRequired
}

export default TodoShow
