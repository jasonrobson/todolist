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

  componentDidMount() {
    // const myInit = {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   mode: 'cors',
    //   credentials: 'omit',
    //   cache: 'default',
    // }
    //const myRequest = new Request('http://localhost:3000/api/v1/todo_items', myInit)
    fetch('http://localhost:3000/api/v1/todo_items')
      .then(response => response.json())
      .then((data) => {
        // create an array of todos only with relevant data
        const todos = data.data.map((c) => {
          return {
            id: c.id,
            name: c.name,
            isCompleted: c.completed,
          }
        })
        // create a new "State" object without mutating
        // the original State object.
        const newState = Object.assign({}, this.state, {
          todolist: todos,
        })
        // store the new state object in the component's state
        this.setState(newState)
      })
      .catch(error => console.log(error))
  }

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
    // const myInit = {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   mode: 'cors',
    //   credentials: 'omit',
    //   cache: 'default',
    // }
    //const myRequest = new Request("http://localhost:3000/api/v1/todo_items/#{payload.id}", myInit)
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
