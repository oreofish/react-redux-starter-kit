import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router'
import TodoTextInput from './TodoTextInput'


class TodoItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false
    }
  }

  handleDoubleClick() {
    this.setState({ editing: true })
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.editTodo(id, text)
    }
    this.setState({ editing: false })
  }

  render() {
    const { todo, completeTodo, deleteTodo } = this.props

    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={(text) => this.handleSave(todo.id, text)} />
      )
    } else {
      element = (
        <div className='view'>
          <div>{todo.completed}</div>
          <Link to={'todos/show/' + todo.id}>{todo.text}</Link>
          <br/>
          <br/>
          <button
            className='destroy'
            onClick={() => deleteTodo(todo.id)} />
        </div>
      )
    }

    return (
      <tr>
        <td>{todo.id}</td>
        <td><Link to={'todos/show/' + todo.id}>{todo.text}</Link></td>
        <td>{todo.completed ? 'true' : 'false'}</td>
        <td>
          <LinkContainer to={'todos/edit/' + todo.id}>
            <Button>Edit</Button>
          </LinkContainer>
          <Button onClick={() => deleteTodo(todo.id)} >Delete</Button>
        </td>
      </tr>
    )
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired
}

export default TodoItem
