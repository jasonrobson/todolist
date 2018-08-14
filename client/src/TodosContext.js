import React, { Component, createContext } from 'react'
import _ from 'lodash'
import { allTodos, createTodo, destroyTodo, updateTodo } from './ApiRequests'

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
      const result = await allTodos()
      const todos = result.data["allTodos"].map((c) => {
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
    } catch (error) {
      console.log(error)
    }
  }

  changeTodo = async (newTodo, oldTodo) => {
    try {
      let result = await updateTodo(newTodo)
      result = result.data["updateTodo"]
      this.setState((prevState) => {
        const todo = { id: result.id, name: result.name, completed: result.completed }
        const newTodoList = _.without(prevState.todolist, oldTodo)
        return { todolist: [...newTodoList, _.cloneDeep(todo)] }
      })
    } catch (error) {
      console.log(error)
    }
  }

  createTodo = async (payload) => {
    try {
      let result = await createTodo({ ...payload, completed: false })
      result = result.data["createTodo"]
      const todo = { id: result.id, name: result.name, completed: result.completed }
      this.setState((state) => {
        return {
          todolist: [...state.todolist, todo],
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  deleteTodo = async (payload) => {
    try {
      await destroyTodo(payload)
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
