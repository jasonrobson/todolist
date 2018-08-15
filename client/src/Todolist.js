import React, { Component, Fragment } from 'react'
import { Compose } from 'react-powerplug'
import _ from 'lodash'
import Filters, { toFilter } from './Filters'
import { OrderConsumer } from './OrderContext'
import { FilterConsumer } from './FilterContext'
import { TodosConsumer } from './TodosContext'
import TodoTable from './TodoTable'
import AlertPopup from './AlertPopup'

const getFilteredTodos = ({ todolist, filterBy }) => (
  todolist.filter(toFilter(filterBy))
)

class TodoList extends Component {
  state = {
    errorMessage: null,
  }

  async componentDidMount() {
    try {
      await this.props.initializeTodos()
    } catch (error) {
      this.setState({
        errorMessage: error,
      })
    }
  }

  render() {
    return (
      <Fragment>
        { this.state.errorMessage != null ? <AlertPopup type={"danger"} message={this.state.errorMessage} /> : null }
        <Compose components={[OrderConsumer, FilterConsumer, TodosConsumer]}>
          {({ orders }, { filterBy }, { todolist }) => {
            const todolistFiltered = getFilteredTodos({ todolist, filterBy })
            const todolistOrdered = _.orderBy(todolistFiltered, ['completed', 'name'], [orders.completed, orders.name])

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
      </Fragment>
    )
  }
}

export default TodoList
