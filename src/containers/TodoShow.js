import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Edit from './TodoEdit'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'

class App extends Component {
  render() {
    const { params, todos, actions } = this.props
    return (
      <div>
        {todos[params.id].text}
      </div>
    )
  }
}

App.propTypes = {
  params: PropTypes.object.isRequired,
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
