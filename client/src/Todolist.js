import React from 'react'
import { Compose } from 'react-powerplug'
import _ from 'lodash'
import Filters, { toFilter } from './Filters'
import { OrderConsumer } from './OrderContext'
import { FilterConsumer } from './FilterContext'
import { TodosConsumer } from './TodosContext'
import TodoTable from './TodoTable'

const getFilteredTodos = ({ todolist, filterBy }) => (
  todolist.filter(toFilter(filterBy))
)

const TodoList = () => (
  <Compose components={[OrderConsumer, FilterConsumer, TodosConsumer]}>
    {({ orders }, { filterBy }, { todolist }) => {
      const todolistFiltered = getFilteredTodos({ todolist, filterBy })
      const todolistOrdered = _.orderBy(todolistFiltered, ['isCompleted', 'name'], [orders.completed, orders.name])

      return (
        todolist.length > 0 ? (
          <div>
            <hr />
            <TodoTable todos={todolistOrdered} />
            <Filters />
          </div>
        ) : null
      )
    }}
  </Compose>
)

export default TodoList
