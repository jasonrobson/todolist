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
          color={todo.isCompleted ? "secondary" : "primary"}
          id={todo.id}
          active={todo.isCompleted}
          style={{ width: 35, height: 35, color: 'white' }}
          onClick={
            () => {
              const payload = {
                ...todo,
                isCompleted: !todo.isCompleted,
              }
              changeTodo(todo, payload)
            }}
        >
          {todo.isCompleted ? '✔' : ''}
        </Button>
      </ButtonGroup>
    )}
  </TodosConsumer>
)

export default TodoCheck
