import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { TodosConsumer } from './TodosContext'
import AlertPopup from './AlertPopup'

const InputText = styled.input`
  width: 200px;
`

class TodoInput extends Component {
  state = {
    fieldName: '',
    error: null,
  }

  onKeyDown = async (event) => {
    const {
      createTodo,
    } = this.state
    if (event.key === 'Enter' && event.target.value !== '') {
      try {
        const newTodo = {
          name: event.target.value,
        }
        await createTodo(newTodo)
        this.resetName()
      } catch (error) {
        this.setState({ error })
      }
    }
  }

  handleFieldNameChange = (evt) => {
    this.setState({ fieldName: evt.target.value })
  }

  resetName = () => {
    this.setState({ fieldName: '' })
  }

  render() {
    const {
      fieldName,
      error,
    } = this.state
    return (
      <Fragment>
        { error !== null ? <AlertPopup type="danger" message={error} /> : null }
        <InputText
          placeholder="Write your task and press enter"
          onKeyDown={this.onKeyDown}
          onChange={this.handleFieldNameChange}
          value={fieldName}
        />
      </Fragment>
    )
  }
}


const TodoInputContainer = props => (
  <TodosConsumer>
    {({ createTodo }) => (
      <TodoInput
        createTodo={createTodo}
        {...props}
      />
    )}
  </TodosConsumer>
)

export default TodoInputContainer
