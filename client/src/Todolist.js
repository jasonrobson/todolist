import React, { Component } from 'react'
import { Compose } from 'react-powerplug'
import _ from 'lodash'
import Filters, { toFilter } from './Filters'
import { OrderConsumer } from './OrderContext'
import { FilterConsumer } from './FilterContext'
import { TodosConsumer } from './TodosContext'
import TodoTable from './TodoTable'
import { AlertToastConsumer } from './AlertToastContext'
import { errorCapture } from './ErrorCapture'

const getFilteredTodos = ({ todolist, filterBy }) => (
  todolist.filter(toFilter(filterBy))
)

class TodoList extends Component {
  async componentDidMount() {
    const {
      initializeTodos,
      notify,
    } = this.props
    const tryInitializeTodos = errorCapture(async () => await initializeTodos(), notify)
    tryInitializeTodos()
  }

  render() {
    return (
      <Compose components={[OrderConsumer, FilterConsumer, TodosConsumer]}>
        {({ orders }, { filterBy }, { todolist }) => {
          const todolistFiltered = getFilteredTodos({ todolist, filterBy })
          const todolistOrdered = _.orderBy(todolistFiltered, ['completed', 'name'], [orders.completed, orders.name])
          return <TodosTableContainer todolist={todolist} todolistOrdered={todolistOrdered} />
        }}
      </Compose>
    )
  }
}

const TodoListContainer = props => (
  <Compose components={[AlertToastConsumer, TodosConsumer]}>
    {({ notify }, { initializeTodos }) => (
      <TodoList
        notify={notify}
        initializeTodos={initializeTodos}
        {...props}
      />
    )}
  </Compose>
)

const TodosTableContainer = props => (
  props.todolist.length > 0 ? (
    <div>
      <hr />
      <TodoTable todos={props.todolistOrdered} />
      <Filters />
    </div>
  ) : null
)

export default TodoListContainer
