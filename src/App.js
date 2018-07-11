import React, { Component } from 'react'
import _ from 'lodash'
import TodoList from './TodoList'
import Filters, { toFilter } from './Filters'
import { FILTER_ALL } from './constants'
import Orders from './Orders'
import Registerer from './Registerer'

const getFilteredTodos = ({ todolist, filterBy }) => (
  todolist.filter(toFilter(filterBy))
)

const BottomToolbar = ({ onChangeFilter }) => (
  <center>
    <h3>
      Filtrar por
    </h3>
    <Filters onClick={onChangeFilter} />
  </center>
)

class App extends Component {
  constructor() {
    super()
    this.state = {
      maxId: 0,
      todolist: [],
      filterBy: FILTER_ALL,
      orderBy: { completed: 'asc', name: 'asc' },
    }
  }

  render() {
    const {
      orderBy,
      maxId,
    } = this.state

    const todolistFiltered = getFilteredTodos(this.state)
    const todolistOrdered = _.orderBy(todolistFiltered, ['isCompleted', 'name'], [orderBy.completed, orderBy.name])

    return (
      <div>
        <div style={{ paddingLeft: '50%' }}>
          <br />
          <br />
          <Registerer
            maxId={maxId}
            onChange={(todoItem) => {
              this.setState((prevState) => {
                return {
                  todolist: [...prevState.todolist, todoItem],
                  maxId: prevState.maxId + 1,
                }
              })
            }
          }
          />
        </div>
        <br />
        <Orders
          initialValues={orderBy}
          onChange={newOrderBy => this.setState({ orderBy: newOrderBy })}
        />
        <br />
        <TodoList
          todos={todolistOrdered}
          onDelete={(todo) => {
            this.setState((prevState) => {
              return {
                todolist: _.without(prevState.todolist, todo),
              }
            })
          }}
          onChange={
            (todoItem, changes) => {
              this.setState((prevState) => {
                const newTodoList = _.without(prevState.todolist, todoItem)
                return { todolist: [...newTodoList, _.cloneDeep(changes)] }
              })
            }
        }
        />
        <hr />
        <BottomToolbar
          onChangeFilter={(filterBy) => { this.setState({ filterBy }) }}
        />
      </div>
    )
  }
}

export default App
