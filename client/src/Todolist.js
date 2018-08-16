import React, { Component, Fragment } from 'react'
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

class TodoList extends Component {
  async componentDidMount() {
    const {
      initializeTodos,
      notify,
    } = this.props
    try {
      await initializeTodos()
    } catch (error) {
      notify('error', error.message)
    }
  }

  render() {
    return (
      <Fragment>
        <Compose components={[OrderConsumer, FilterConsumer, TodosConsumer]}>
          {({ orders }, { filterBy }, { todolist }) => {
            const todolistFiltered = getFilteredTodos({ todolist, filterBy })
            const todolistOrdered = _.orderBy(todolistFiltered, ['completed', 'name'], [orders.completed, orders.name])
            return <TodoListContainer todolist={todolist} todolistOrdered={todolistOrdered} />
          }}
        </Compose>
      </Fragment>
    )
  }
}

const TodoListContainer = props => (
  props.todolist.length > 0 ? (
    <div>
      <hr />
      <TodoTable todos={props.todolistOrdered} />
      <Filters />
    </div>
  ) : null
)

export default TodoList
