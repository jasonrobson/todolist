import React, { Component, createContext } from 'react'
import _ from 'lodash'
import { allTodos, createTodo, destroyTodo, updateTodo } from './ApiRequests'
import AlertPopup from './AlertPopup'

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
    } catch (error) {
      // return (<AlertPopup type={"danger"} message={error} />)
      console.log(error)
    }
  }

  changeTodo = async (newTodo, oldTodo) => {
    try {
      const result = await updateTodo(newTodo)
      this.setState((prevState) => {
        const todo = { id: result.id, name: result.name, completed: result.completed }
        const newTodoList = _.without(prevState.todolist, oldTodo)
        return { todolist: [...newTodoList, _.cloneDeep(todo)] }
      })
    } catch (error) {
      // return (<AlertPopup type={"danger"} message={error} />)
      console.log(error)
    }
  }

  createTodo = async (payload) => {
    try {
      const result = await createTodo({ ...payload, completed: false })
      const todo = { id: result.id, name: result.name, completed: result.completed }
      this.setState((state) => {
        return {
          todolist: [...state.todolist, todo],
        }
      })
    } catch (error) {
      // return (<AlertPopup type={"danger"} message={error} />)
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
      //return (<AlertPopup type={"danger"} message={error} />)
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
