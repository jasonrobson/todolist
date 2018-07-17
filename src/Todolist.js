import React, { Fragment, createContext } from 'react'
import { Button, ButtonGroup } from 'reactstrap'
import _ from 'lodash'
import TodoText from './TodoText'
import Order from './Order'
import { toFilter } from './Filters'
import { OrderConsumer } from './OrderContext'
import { FilterConsumer } from './FilterContext'
import { TodosConsumer } from './TodosContext'
import Main from './Main.css'

export const TodoListContext = createContext({
  todos: [],
  changeTodo: () => {},
  deleteTodo: () => {},
})

const getFilteredTodos = ({ todolist, filterBy }) => (
  todolist.filter(toFilter(filterBy))
)

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
        <img src={require("./delete.png")} style={{ width: 15, height: 15 }} alt="" />
      </button>
    )}
  </TodosConsumer>
)

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

const TodoList = () => (
  <OrderConsumer>
    {({ orders }) => (
      <FilterConsumer>
        {({ filterBy }) => (
          <TodosConsumer>
            {({
              todolist,
            }) => {
              const todolistFiltered = getFilteredTodos({ todolist, filterBy })
              const todolistOrdered = _.orderBy(todolistFiltered, ['isCompleted', 'name'], [orders.completed, orders.name])
              return (
                todolist.length > 0 ? (
                  <div>
                    <hr />
                    <TodoTable todos={todolistOrdered} />
                  </div>
                ) : ''
              )
            }}
          </TodosConsumer>
        )}
      </FilterConsumer>
    )}
  </OrderConsumer>
)

export default TodoList
