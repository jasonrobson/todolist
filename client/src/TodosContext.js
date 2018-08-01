import React, { Component, createContext } from 'react'
import _ from 'lodash'
import { makeRequest } from './ApiRequests'

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

  initializeTodos = async () => {
    try {
      this.result = await makeRequest({ method: 'get' })
      this.todos = this.result.map((c) => {
        return {
          id: c.id,
          name: c.name,
          completed: c.completed,
        }
      })
      const newState = Object.assign({}, this.state, {
        todolist: this.todos,
      })
      this.setState(newState)
    } catch (error) {
      console.log(error)
    }
  }

  changeTodo = async (payload, todo) => {
    try {
      this.result = await makeRequest({ method: 'put', body: payload })
      this.setState((prevState) => {
        this.todo = { id: this.result.id, name: this.result.name, completed: this.result.completed }
        const newTodoList = _.without(prevState.todolist, todo)
        return { todolist: [...newTodoList, _.cloneDeep(this.todo)] }
      })
    } catch (error) {
      console.log(error)
    }
  }

  createTodo = async (todo) => {
    try {
      this.result = await makeRequest({
        method: 'post',
        body:
        {
          ...todo,
          completed: false,
        },
      })
      this.todo = { id: this.result.id, name: this.result.name, completed: this.result.completed }
      this.setState((state) => {
        return {
          todolist: [...state.todolist, this.todo],
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  deleteTodo = async (payload) => {
    try {
      console.log(payload)
      await makeRequest({ method: 'delete', body: payload })
      this.setState((prevState) => {
        return {
          todolist: _.without(prevState.todolist, payload),
        }
      })
    } catch (error) {
      console.log(error)
    }
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
