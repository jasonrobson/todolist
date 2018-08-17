import React, { Component } from 'react'
import { Compose } from 'react-powerplug'
import styled from 'styled-components'
import { AlertToastConsumer } from './AlertToastContext'
import { TodosConsumer } from './TodosContext'
import { TodoConsumer } from './TodoContext'
import { errorCapture } from './ErrorCapture'

const InputText = styled.input`
  background-color: ${({ typing }) => typing ? 'red' : 'white'};
  visibility: ${({ editing }) => editing ? 'visible' : 'hidden'};
  position: ${({ editing }) => editing ? 'relative' : 'absolute'};
  width: 200px;
`

class TodoTextInput extends Component {
  onKeyDown = (event) => {
    const {
      todo,
      changeTodo,
      resetProps,
      notify,
    } = this.props
    errorCapture(async () => {
      const newName = event.target.value
      if (event.key === 'Enter') {
        const payload = {
          ...todo,
          name: newName,
        }
        await changeTodo(payload, todo)
        resetProps()
      }
    }, notify)
  }

  onKeyUp = (event) => {
    const newName = event.target.value
    this.props.onChangeTyping(newName !== this.props.todo.name)
  }

  render() {
    const { todo } = this.props

    return (
      <InputText
        defaultValue={todo.name}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
        {...this.props}
      />
    )
  }
}

const TodoTextInputContainer = props => (
  <Compose components={[TodosConsumer, TodoConsumer, AlertToastConsumer]}>
    {({ changeTodo }, actions, { notify }) => (
      <TodoTextInput
        changeTodo={changeTodo}
        notify={notify}
        {...actions}
        {...props}
      />
    )}
  </Compose>
)

export default TodoTextInputContainer
