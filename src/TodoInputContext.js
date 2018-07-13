import React, { Component, createContext } from 'react'

const Context = createContext({
  maxId: 0,
  createTodo: () => {},
})

export class TodoInputProvider extends Component {
  state = {
    maxId: 0,
    createTodo: this.createTodo,
  }

  createTodo = (payload) => {
    this.setState((prevState) => {
      return {
        todolist: [...prevState.todolist, payload],
        maxId: prevState.maxId + 1,
      }
    })
  }

  render() {
    return <br />
  }
}

export const { Consumer: TodoInputConsumer } = Context
