import React, { Component } from 'react'
import _ from 'lodash'
import TodoList from './TodoList'
import Filters, { toFilter } from './Filters'
import { FILTER_ALL } from './constants'
import Orders from './Orders'

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
      fieldName: '',
      maxId: 0,
      todolist: [],
      filterBy: FILTER_ALL,
      orderBy: { completed: 'asc', name: 'asc' },
    }
  }

  handleFieldNameChange = (evt) => {
    this.setState({ fieldName: evt.target.value })
  }

  resetName = () => {
    this.setState({ fieldName: '' })
  }

  render() {
    const {
      todolist,
      orderBy,
      fieldName,
    } = this.state

    const todolistFiltered = getFilteredTodos(this.state)
    const todolistOrdered = _.orderBy(todolistFiltered, ['isCompleted', 'name'], [orderBy.completed, orderBy.name])

    return (
      <div>
        <div style={{ paddingLeft: '50%' }}>
          <br />
          <br />
          <input
            onBlur={this.resetName}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                const name = event.target.value

                this.setState((prevState) => {
                  const newTodo = {
                    id: prevState.maxId + 1,
                    isCompleted: false,
                    name,
                  }

                  return {
                    todolist: [...prevState.todolist, newTodo],
                    maxId: prevState.maxId + 1,
                  }
                })
              }
            }}
            onChange={this.handleFieldNameChange}
            value={fieldName}
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
            this.setState({
              todolist: _.without(todolist, todo),
            })
          }}
          onChange={
            (todoItem, changes) => {
              Object.assign(todoItem, changes)
              this.setState({ todolist })
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
