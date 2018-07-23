import React from 'react'
import { TodosConsumer } from './TodosContext'
import TrashCanImage from './delete.png'

const TodoDelete = ({ todo }) => (
  <TodosConsumer>
    {({
      deleteTodo,
    }) => (
      <button
        type="button"
        onClick={() => deleteTodo(todo)}
        style={{
          width: 60,
          height: 35,
          backgroundColor: 'Transparent',
          backgroundRepeat: 'no-repeat',
          border: 'none',
        }}
      >
        <img src={TrashCanImage} style={{ width: 15, height: 15 }} alt="" />
      </button>
    )}
  </TodosConsumer>
)

export default TodoDelete
