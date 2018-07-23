import React from 'react'
import TodoText from './TodoText'
import Order from './Order'
import TodoCheck from './TodoCheck'
import TodoDelete from './TodoDelete'

const TodoTable = ({ todos }) => (
  <table>
    <thead>
      <tr>
        <th style={{ width: '49%', textAlign: 'center' }}>
          <Order name="completed">
            Completada
          </Order>
        </th>
        <th style={{ width: '49%', textAlign: 'center' }}>
          <Order name="name">
            Nome
          </Order>
        </th>
      </tr>
    </thead>
    <tbody>
      {todos.map((todo) => {
        return (
          <tr key={todo.id}>
            <td>
              <TodoCheck todo={todo} />
            </td>
            <td>
              <TodoText todo={todo} />
            </td>
            <td>
              <TodoDelete todo={todo} />
            </td>
          </tr>
        )
      })}
    </tbody>
  </table>
)

export default TodoTable
