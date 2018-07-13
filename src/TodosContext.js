import React, { Component, createContext } from 'react'
import _ from 'lodash'

export const Context = createContext({
  todolist: [],
  maxId: 0,
  changeTodo: () => {},
  deleteTodo: () => {},
  createTodo: () => {},
})

export class TodosProvider extends Component {
  state = {
    todolist: [],
    maxId: 0,
    changeTodo: this.changeTodo,
    deleteTodo: this.deleteTodo,
    createTodo: this.createTodo,
  }

  changeTodo = (todo, payload) => {
    this.setState((prevState) => {
      const newTodoList = _.without(prevState.todolist, todo)
      return { todolist: [...newTodoList, _.cloneDeep(payload)] }
    })
  }

  createTodo = (newTodo) => {
    this.setState(state => ({
      todolist: [...state.todolist, newTodo],
      maxId: state.maxId + 1,
    }))
  }

  deleteTodo = (payload) => {
    this.setState((prevState) => {
      return {
        todolist: _.without(prevState.todolist, payload),
      }
    })
  }

  render() {
    const value = {
      ...this.state,
      changeTodo: this.changeTodo,
      deleteTodo: this.deleteTodo,
      createTodo: this.createTodo,
    }

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const { Consumer: TodosConsumer } = Context
