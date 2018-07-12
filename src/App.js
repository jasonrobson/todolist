import React, { Component } from 'react'
import _ from 'lodash'
import TodoList, { TodoListContext } from './TodoList'
import Filters, { FilterContext } from './Filters'
import { FILTER_ALL } from './constants'
import Orders, { OrderContext } from './Orders'
import Registerer from './Registerer'

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

    this.changeOrders = (payload) => {
      this.setState(() => ({
        orderBy: payload,
      }))
    }

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

    this.state = {
      maxId: 0,
      todolist: [],
      filterBy: FILTER_ALL,
      orderBy: { completed: 'asc', name: 'asc' },
      changeOrders: this.changeOrders,
      changeTodo: this.changeTodo,
      deleteTodo: this.deleteTodo,
      changeFilter: this.changeFilter,
    }
  }

  render() {
    const {
      maxId,
    } = this.state

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
        <OrderContext.Provider value={this.state}>
          <Orders />
        </OrderContext.Provider>
        <br />
        <TodoListContext.Provider value={this.state}>
          <TodoList />
        </TodoListContext.Provider>
        <hr />
        <FilterContext.Provider value={this.state}>
          <BottomToolbar />
        </FilterContext.Provider>
      </div>
    )
  }
}

export default App
