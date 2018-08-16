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
    const result = await allTodos()
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
  }

  changeTodo = async (newTodo, oldTodo) => {
    const result = await updateTodo(newTodo)
    this.setState((prevState) => {
      const newTodoList = _.without(prevState.todolist, oldTodo)
      return { todolist: [...newTodoList, _.cloneDeep({ id: result.id, name: result.name, completed: result.completed })] }
    })
  }

  createTodo = async (payload) => {
    const result = await createTodo({ ...payload, completed: false })
    this.setState((state) => {
      return {
        todolist: [...state.todolist, { id: result.id, name: result.name, completed: result.completed }],
      }
    })
  }

  deleteTodo = async (payload) => {
    await destroyTodo(payload)
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
