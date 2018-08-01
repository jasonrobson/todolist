import React, { Component, createContext } from 'react'
import _ from 'lodash'
import { getAllTodos, removeTodo, insertTodo, updateTodo } from './ApiRequests'

export const Context = createContext({
  todolist: [],
  changeTodo: () => {},
  deleteTodo: () => {},
  createTodo: () => {},
  initializeTodos: () => {},
})

export class TodosProvider extends Component {
  state = {
    todolist: [],
    changeTodo: this.changeTodo,
    deleteTodo: this.deleteTodo,
    createTodo: this.createTodo,
    initializeTodos: this.initializeTodos,
  }

  initializeTodos = () => (
    getAllTodos()
      .then((result) => {
        const todos = result.map((c) => {
          return {
            id: c.id,
            name: c.name,
            completed: c.completed,
          }
        })
        const newState = Object.assign({}, this.state, {
          todolist: todos,
        })
        this.setState(newState)
      })
      .catch(error => console.log(error))
  )

  changeTodo = (payload, todo) => {
    updateTodo(payload)
      .then((result) => {
        this.setState((prevState) => {
          this.todo = { id: result.id, name: result.name, completed: result.completed }
          const newTodoList = _.without(prevState.todolist, todo)
          return { todolist: [...newTodoList, _.cloneDeep(this.todo)] }
        })
      })
      .catch(error => console.log(error))
  }

  createTodo = (todo) => {
    insertTodo(
      {
        ...todo,
        completed: false,
      },
    )
      .then((result) => {
        this.todo = { id: result.id, name: result.name, completed: result.completed }
        this.setState((state) => {
          return {
            todolist: [...state.todolist, this.todo],
          }
        })
      })
      .catch(error => console.log(error))
  }

  deleteTodo = (payload) => {
    removeTodo(payload)
      .then(() => {
        this.setState((prevState) => {
          return {
            todolist: _.without(prevState.todolist, payload),
          }
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    const value = {
      ...this.state,
      changeTodo: this.changeTodo,
      deleteTodo: this.deleteTodo,
      createTodo: this.createTodo,
      initializeTodos: this.initializeTodos,
    }

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const { Consumer: TodosConsumer } = Context
