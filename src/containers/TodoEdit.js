import React, { PropTypes, Component } from 'react'
import { browserHistory } from 'react-router'
import _ from 'lodash'
import TodoTextInput from './../components/TodoTextInput'

class TodoEdit extends Component {
  handleSave(text) {
    if (text.length !== 0) {
      if (_.isEmpty(this.props.params)) {
        // add new
        this.props.actions.addTodo(text)
      } else {
        // update
        const id = parseInt(this.props.params.id)
        this.props.actions.editTodo(id, text)
      }

      browserHistory.push('/todos')
    }
  }

  render() {
    return (
      <div className='Edit'>
        <TodoTextInput newTodo
                       onSave={this.handleSave.bind(this)}
                       placeholder='What needs to be done?' />
      </div>
    )
  }
}

TodoEdit.propTypes = {
  params: PropTypes.object.isRequired,
  actions: PropTypes.array.isRequired
}

export default TodoEdit

