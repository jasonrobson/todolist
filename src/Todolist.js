import React, { Fragment } from 'react'
import TodoText from './TodoText'

const TodoList = ({ todos, onChange, onDelete }) => (
  todos.map(todo => (
    <Fragment key={todo.id}>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={event => onChange(todo, { ...todo, isCompleted: event.target.checked })}
      />
      <TodoText
        todo={todo}
        onChange={changes => onChange(todo, changes)}
      />
      <button
        type="button"
        onClick={() => onDelete(todo)}
      >
        Excluir
      </button>
      <br />
    </Fragment>
  ))
)

export default TodoList
