import React, { Fragment, createContext } from 'react'
import _ from 'lodash'
import TodoText, { TodoTextContext } from './TodoText'
import Filters, { toFilter } from './Filters'

import { OrderConsumer } from './OrderContext'

export const TodoListContext = createContext({
  todos: [],
  changeTodo: () => {},
  deleteTodo: () => {},
})

const getFilteredTodos = ({ todolist, filterBy }) => (
  todolist.filter(toFilter(filterBy))
)

const TodoList = () => (
  <OrderConsumer>
    {({ orders }) => (console.log(orders),
      <TodoListContext.Consumer>
        {({
          todolist,
          changeTodo,
          deleteTodo: onDelete,
          filterBy,
        }) => {
          const todolistFiltered = getFilteredTodos({ todolist, filterBy })
          const todolistOrdered = _.orderBy(todolistFiltered, ['isCompleted', 'name'], [orders.completed, orders.name])
          return (
            todolistOrdered.map((todo) => {
              return (
                <Fragment key={todo.id}>
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
                  <TodoTextContext.Provider value={todo}>
                    <TodoText />
                  </TodoTextContext.Provider>
                  <button
                    type="button"
                    onClick={() => onDelete(todo)}
                  >
                    Excluir
                  </button>
                  <br />
                </Fragment>
              )
            })
          )
        }}
      </TodoListContext.Consumer>
    )}
  </OrderConsumer>
)

export default TodoList
