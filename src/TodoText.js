import React, { Component, Fragment } from 'react'

const getBackgroundColor = ({ typing }) => {
  if (typing) {
    return 'red'
  }
  return 'white'
}

class TodoText extends Component {
  state = {
    typing: false,
    editing: false,
  }

  render() {
    const { changeTodo, todo } = this.props
    const { editing } = this.state
    return (
      <Fragment>
        <span
          style={{
            visibility: editing ? 'hidden' : 'visible',
            position: editing ? 'absolute' : 'relative',
            backgroundColor: todo.isCompleted ? 'gray' : '',
            textDecoration: todo.isCompleted ? 'line-through' : '',
          }}
          onDoubleClick={() => {
            this.setState({ editing: true })
          }}
        >
          {todo.name}
        </span>
        <input
          style={{
            backgroundColor: getBackgroundColor({
              ...this.state,
              todo,
            }),
            visibility: editing ? 'visible' : 'hidden',
            position: editing ? 'relative' : 'absolute',
            width: '200px',
          }}
          defaultValue={todo.name}
          onKeyDown={(event) => {
            const newName = event.target.value
            if (event.key === 'Enter') {
              const payload = {
                ...todo,
                name: newName,
              }
              changeTodo(todo, payload)
              this.setState({ typing: false })
              this.setState({ editing: false })
            }
          }}
          onKeyUp={(event) => {
            const newName = event.target.value
            this.setState({
              typing: newName !== todo.name,
            })
          }}
        />
      </Fragment>
    )
  }
}

export default TodoText
