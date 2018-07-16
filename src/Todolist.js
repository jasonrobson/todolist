import React, { Fragment, createContext } from 'react'
import _ from 'lodash'
import TodoText from './TodoText'
import { toFilter } from './Filters'
import { OrderConsumer } from './OrderContext'
import { FilterConsumer } from './FilterContext'
import { TodosConsumer } from './TodosContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import Main from './Main.css'

export const TodoListContext = createContext({
  todos: [],
  changeTodo: () => {},
  deleteTodo: () => {},
})

const getFilteredTodos = ({ todolist, filterBy }) => (
  todolist.filter(toFilter(filterBy))
)

const TodoCheck = ({ todo, changeTodo }) => (
  <div className="chiller_cb">
    <input
      id={todo.id}
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
    <label htmlFor={todo.id}>{todo.isCompleted ? 'done' : 'to do'}</label>
    <span></span>
  </div>
)

const TodoDelete = ({ todo, onDelete }) => (
  <button
    type="button"
    onClick={() => onDelete(todo)}
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
                      <tbody>
                        <tr>
                          <td>
                            <TodoCheck todo={todo} changeTodo={changeTodo} />
                          </td>
                          <td>
                            <TodoText changeTodo={changeTodo} todo={todo} />
                          </td>
                          <td>
                            <TodoDelete todo={todo} onDelete={onDelete} />
                          </td>
                        </tr>
                      </tbody>
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
