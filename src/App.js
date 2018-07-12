import React, { Component } from 'react'
import _ from 'lodash'
import TodoList, { TodoListContext } from './TodoList'
import Filters, { FilterContext } from './Filters'
import { FILTER_ALL } from './constants'
import Orders from './Orders'
import { OrderProvider } from './OrderContext'
import Registerer, { RegistererContext } from './Registerer'

const BottomToolbar = () => (
  <center>
    <h3>
      Filtrar por
    </h3>
    <Filters />
  </center>
)

class App extends Component {
  constructor() {
    super()

    this.changeTodo = (todo, payload) => {
      this.setState((prevState) => {
        const newTodoList = _.without(prevState.todolist, todo)
        return { todolist: [...newTodoList, _.cloneDeep(payload)] }
      })
    }
    this.deleteTodo = (payload) => {
      this.setState((prevState) => {
        return {
          todolist: _.without(prevState.todolist, payload),
        }
      })
    }
    this.changeFilter = (payload) => {
      this.setState(() => {
        return {
          filterBy: payload,
        }
      })
    }
    this.changeRegisterer = (payload) => {
      this.setState((prevState) => {
        return {
          todolist: [...prevState.todolist, payload],
          maxId: prevState.maxId + 1,
        }
      })
    }

    this.state = {
      maxId: 0,
      todolist: [],
      filterBy: FILTER_ALL,
      changeTodo: this.changeTodo,
      deleteTodo: this.deleteTodo,
      changeFilter: this.changeFilter,
      changeRegisterer: this.changeRegisterer,
    }
  }

  render() {
    return (
      <OrderProvider>
        <div>
          <div style={{ paddingLeft: '50%' }}>
            <br />
            <br />
            <RegistererContext.Provider value={this.state}>
              <Registerer />
            </RegistererContext.Provider>
          </div>
          <br />
          <Orders />
          <br />
          <TodoListContext.Provider value={this.state}>
            <TodoList />
          </TodoListContext.Provider>
          <hr />
          <FilterContext.Provider value={this.state}>
            <BottomToolbar />
          </FilterContext.Provider>
        </div>
      </OrderProvider>
    )
  }
}

export default App
