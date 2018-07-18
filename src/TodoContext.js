import React, { Component, createContext } from 'react'

const Context = createContext({
  editing: false,
  typing: false,
  onChangeEditing: () => {},
  onChangeTyping: () => {},
  resetProps: () => {},
})

export class TodoProvider extends Component {
  state = {
    editing: false,
    typing: false,
  }

  onChangeEditing = () => {
    this.setState(state => ({
      editing: !state.editing,
    }))
  }

  onChangeTyping = (payload) => {
    this.setState(() => ({
      typing: payload,
    }))
  }

  resetProps = () => {
    this.setState({
      editing: false,
      typing: false,
    })
  }

  render() {
    const value = {
      ...this.state,
      onChangeEditing: this.onChangeEditing,
      onChangeTyping: this.onChangeTyping,
      resetProps: this.resetProps,
    }

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const { Consumer: TodoConsumer } = Context
