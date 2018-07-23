import React, { Component } from 'react'
import { TodosConsumer } from './TodosContext'

class TodoInput extends Component {
  state = {
    fieldName: '',
  }

  handleFieldNameChange = (evt) => {
    this.setState({ fieldName: evt.target.value })
  }

  resetName = () => {
    this.setState({ fieldName: '' })
  }

  render() {
    const { fieldName } = this.state
    return (
      <TodosConsumer>
        {({ createTodo }) => (
          <input
            className="todoinput"
            placeholder="Write your task and press enter"
            style={{
              minWidth: '500px',
              textAlign: 'center',
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && event.target.value !== '') {
                const newTodo = {
                  name: event.target.value,
                }
                createTodo(newTodo)
                this.resetName()
              }
            }}
            onChange={this.handleFieldNameChange}
            value={fieldName}
          />
        )}
      </TodosConsumer>
    )
  }
}

export default TodoInput
