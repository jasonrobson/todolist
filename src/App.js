import React, { Component } from 'react'
import _ from 'lodash'
import Todolist from './Todolist'
import Filters, { toFilter } from './Filters'
import { FILTER_ALL } from './constants'
import Orders, { invertOrder } from './Orders'

const getFilteredTodos = ({ todolist, filterBy }) => (
  todolist.filter(toFilter(filterBy))
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
          onClick={(currentOrderBy) => {
            this.setState({
              orderBy: {
                ...orderBy,
                [currentOrderBy]: invertOrder(orderBy[currentOrderBy]),
              },
            })
          }}
        />
        <br />
        <Todolist
          todos={todolistOrdered}
          onDelete={
          (todoItem) => {
            const newlist = todolist.filter(todoFilter => (todoFilter.id !== todoItem.id))
            this.setState({ todolist: newlist })
          }
        }
          onChange={
            (todoItem, changes) => {
              Object.assign(todoItem, changes)
              this.setState({ todolist })
            }
        }
        />
        <hr />
        <center>
          <h3>
            Filtrar por
          </h3>
          <Filters onClick={(filterBy) => { this.setState({ filterBy }) }} />
        </center>
      </div>
    )
  }
}

export default App
