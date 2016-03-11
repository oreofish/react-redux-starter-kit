import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import TodoTextInput from './../components/TodoTextInput'
import * as TodoActions from '../actions/Todos'

class TodoEdit extends Component {
  handleSave(text) {
    if (text.length !== 0) {
      this.props.actions.addTodo(text)
      console.log("jump to")
      browserHistory.push('/todos')
    }
  }

  render() {
    return (
      <div className="Edit">
          <TodoTextInput newTodo
                         onSave={this.handleSave.bind(this)}
                         placeholder="What needs to be done?" />
      </div>
    )
  }
}

TodoEdit.propTypes = {
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
)(TodoEdit)

