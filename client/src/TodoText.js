import React from 'react'
import { TodosConsumer } from './TodosContext'
import { TodoConsumer, TodoProvider } from './TodoContext'

const getBackgroundColor = (typing) => {
  if (typing) {
    return 'red'
  }
  return 'white'
}

const TodoTextSpan = ({ todo }) => (
  <TodoConsumer>
    {({
      editing,
      onChangeEditing,
    }) => (
      <span
        style={{
          visibility: editing ? 'hidden' : 'visible',
          position: editing ? 'absolute' : 'relative',
          backgroundColor: todo.isCompleted ? 'gray' : '',
          textDecoration: todo.isCompleted ? 'line-through' : '',
        }}
        onDoubleClick={() => { onChangeEditing() }}
      >
        {todo.name}
      </span>
    )}
  </TodoConsumer>
)

const TodoTextInput = ({ todo }) => (
  <TodosConsumer>
    {({
      changeTodo,
    }) => (
      <TodoConsumer>
        {({
          editing,
          typing,
          onChangeTyping,
          resetProps,
        }) => (
          <input
            style={{
              backgroundColor: getBackgroundColor(typing),
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
                resetProps()
              }
            }}
            onKeyUp={(event) => {
              const newName = event.target.value
              onChangeTyping(newName !== todo.name)
            }}
          />
        )}
      </TodoConsumer>
    )}
  </TodosConsumer>
)

const TodoText = props => (
  <TodoProvider>
    <TodoTextSpan
      todo={props.todo}
    />
    <TodoTextInput
      todo={props.todo}
    />
  </TodoProvider>
)

export default TodoText
