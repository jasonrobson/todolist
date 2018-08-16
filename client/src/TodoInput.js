import React, { Component, Fragment } from 'react'
import { Compose } from 'react-powerplug'
import styled from 'styled-components'
import { TodosConsumer } from './TodosContext'
import { AlertToastConsumer } from './AlertToastContext'

const InputText = styled.input`
  width: 500px;
`

class TodoInput extends Component {
  state = {
    fieldName: '',
  }

  onKeyDown = async (event) => {
    const {
      createTodo,
      notify,
    } = this.props
    if (event.key === 'Enter' && event.target.value !== '') {
      try {
        const newTodo = {
          name: event.target.value,
        }
        await createTodo(newTodo)
        this.resetName()
      } catch (error) {
        notify('error', error.message)
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
    } = this.state
    return (
      <Fragment>
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
  <Compose components={[TodosConsumer, AlertToastConsumer]}>
    {({ createTodo }, { notify }) => (
      <TodoInput
        createTodo={createTodo}
        notify={notify}
        {...props}
      />
    )}
  </Compose>
)

export default TodoInputContainer
