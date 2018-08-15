import React from 'react'
import TodoTextInput from './TodoTextInput'
import { TodoConsumer, TodoProvider } from './TodoContext'

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
          backgroundColor: todo.completed ? 'gray' : '',
          textDecoration: todo.completed ? 'line-through' : '',
        }}
        onDoubleClick={() => { onChangeEditing() }}
      >
        {todo.name}
      </span>
    )}
  </TodoConsumer>
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
