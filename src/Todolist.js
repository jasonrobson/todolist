import React, { Fragment, createContext } from 'react'
import _ from 'lodash'
import TodoText, { TodoTextContext } from './TodoText'
import Filters, { toFilter } from './Filters'

import { OrderConsumer } from './OrderContext'
import { FilterConsumer } from './FilterContext';
import { TodosConsumer } from './TodosContext';

export const TodoListContext = createContext({
  todos: [],
  changeTodo: () => {},
  deleteTodo: () => {},
})

const getFilteredTodos = ({ todolist, filterBy }) => (
  todolist.filter(toFilter(filterBy))
)

const TodoCheck = ({ todo, changeTodo }) => (
  <input
    type="checkbox"
    checked={todo.isCompleted}
    onChange={
      (event) => {
        const payload = {
          ...todo,
          isCompleted: event.target.checked,
        }
        changeTodo(todo, payload)
      }}
  />
)

const TodoDelete = ({ todo, onDelete }) => (
  <button
    type="button"
    onClick={() => onDelete(todo)}
  >
    Excluir
  </button>
)

const TodoList = () => (
  <OrderConsumer>
    {({ orders }) => (
      <FilterConsumer>
        {({ filterBy }) => (
          <TodosConsumer>
            {({
              todolist,
              changeTodo,
              deleteTodo: onDelete,
            }) => {
              const todolistFiltered = getFilteredTodos({ todolist, filterBy })
              const todolistOrdered = _.orderBy(todolistFiltered, ['isCompleted', 'name'], [orders.completed, orders.name])
              return (
                todolistOrdered.map((todo) => {
                  return (
                    <Fragment key={todo.id}>
                      <br />
                      <TodoCheck todo={todo} changeTodo={changeTodo} />
                      <TodoText changeTodo={changeTodo} todo={todo} />
                      <TodoDelete todo={todo} onDelete={onDelete} />
                    </Fragment>
                  )
                })
              )
            }}
          </TodosConsumer>
        )}
      </FilterConsumer>
    )}
  </OrderConsumer>
)

export default TodoList
