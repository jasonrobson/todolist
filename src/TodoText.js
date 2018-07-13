import React, { Component, Fragment } from 'react'

const getBackgroundColor = ({ typing, todo }) => {
  if (typing) {
    return 'red'
  }
  if (todo.isCompleted) {
    return 'lightgray'
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
