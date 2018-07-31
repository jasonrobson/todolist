import React, { Component, createContext } from 'react'
import _ from 'lodash'
import { getAllTodos, removeTodo } from './ApiRequests'

export const Context = createContext({
  todolist: [],
  maxId: 0,
  changeTodo: () => {},
  deleteTodo: () => {},
  createTodo: () => {},
  initializeTodos: () => {},
})

export class TodosProvider extends Component {
  state = {
    todolist: [],
    maxId: 0,
    changeTodo: this.changeTodo,
    deleteTodo: this.deleteTodo,
    createTodo: this.createTodo,
    initializeTodos: this.initializeTodos,
  }

  initializeTodos = () => (
    getAllTodos()
      .then((data) => {
        const todos = data.data.map((c) => {
          return {
            id: c.id,
            name: c.name,
            isCompleted: c.completed,
          }
        })
        const newState = Object.assign({}, this.state, {
          todolist: todos,
        })
        this.setState(newState)
      })
      .catch(error => console.log(error))
  )

  changeTodo = (todo, payload) => {
    this.setState((prevState) => {
      const newTodoList = _.without(prevState.todolist, todo)
      return { todolist: [...newTodoList, _.cloneDeep(payload)] }
    })
  }

  createTodo = (todo) => {
    this.setState((state) => {
      const newTodo = {
        isCompleted: false,
        id: state.maxId + 1,
        ...todo,
      }
      return {
        todolist: [...state.todolist, newTodo],
        maxId: state.maxId + 1,
      }
    })
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
