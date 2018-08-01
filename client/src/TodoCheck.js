import React from 'react'
import { Button, ButtonGroup } from 'reactstrap'
import { TodosConsumer } from './TodosContext'

const TodoCheck = ({ todo }) => (
  <TodosConsumer>
    {({
      changeTodo,
    }) => (
      <ButtonGroup>
        <Button
          color={todo.completed ? "secondary" : "primary"}
          id={todo.id}
          active={todo.completed}
          style={{ width: 35, height: 35, color: 'white' }}
          onClick={
            () => {
              const payload = {
                ...todo,
                completed: !todo.completed,
              }
              changeTodo(payload, todo)
            }}
        >
          {todo.completed ? '✔' : ''}
        </Button>
      </ButtonGroup>
    )}
  </TodosConsumer>
)

export default TodoCheck
