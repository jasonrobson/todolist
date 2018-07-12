import React, { Component, createContext } from 'react'
import TodoList, { TodoListContext } from './TodoList';

const getBackgroundColor = ({ changing, todo }) => {
  if (changing) {
    return 'red'
  }

  if (todo.isCompleted) {
    return 'lightgray'
  }

  return 'white'
}

export const TodoTextContext = createContext({})

class TodoText extends Component {
  state = {
    changing: false,
  }

  render() {
    return (
      <TodoListContext.Consumer>
        {({ changeTodo }) => (
          <TodoTextContext.Consumer>
            {todo => (
              <input
                style={{
                  backgroundColor: getBackgroundColor({
                    ...this.state,
                    todo,
                  }),
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
            )}
          </TodoTextContext.Consumer>
        )}
      </TodoListContext.Consumer>
    )
  }
}

export default TodoText
