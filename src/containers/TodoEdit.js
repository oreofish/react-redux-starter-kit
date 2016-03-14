import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import TodoTextInput from './../components/TodoTextInput'

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
  params: PropTypes.object.isRequired
}

export default TodoEdit

