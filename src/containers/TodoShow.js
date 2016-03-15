import React, { Component, PropTypes } from 'react'

class TodoShow extends Component {
  render() {
    const { params, todos } = this.props
    return (
      <div>
        {todos[params.id].text}
      </div>
    )
  }
}

TodoShow.propTypes = {
  params: PropTypes.object.isRequired,
  todos: PropTypes.array.isRequired
}

export default TodoShow
