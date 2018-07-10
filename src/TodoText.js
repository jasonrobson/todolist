import React, { Component } from 'react'

const getBackgroundColor = ({ changing, todo }) => {
  if (changing) {
    return 'red'
  }

  if (todo.isCompleted) {
    return 'lightgray'
  }

  return 'white'
}

class TodoText extends Component {
  state = {
    changing: false,
  }

  render() {
    const { todo, onChange } = this.props

    return (
      <input
        style={{
          backgroundColor: getBackgroundColor({
            ...this.state,
            ...this.props,
          }),
        }}
        defaultValue={todo.name}
        onKeyDown={(event) => {
          const newName = event.target.value

          if (event.key === 'Enter') {
            onChange({ name: newName })
            this.setState({ changing: false })
          }
        }}
        onKeyUp={(event) => {
          const newName = event.target.value

          this.setState({
            changing: newName !== todo.name,
          })
        }}
      />
    )
  }
}

export default TodoText
