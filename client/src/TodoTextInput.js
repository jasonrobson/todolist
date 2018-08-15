import React, { Component, Fragment } from 'react'
import { Compose } from 'react-powerplug'
import styled from 'styled-components'
import { TodosConsumer } from './TodosContext'
import { TodoConsumer } from './TodoContext'
import AlertPopup from './AlertPopup'

const InputText = styled.input`
  background-color: ${({ typing }) => typing ? 'red' : 'white'};
  visibility: ${({ editing }) => editing ? 'visible' : 'hidden'};
  position: ${({ editing }) => editing ? 'relative' : 'absolute'};
  width: '200px';
`

class TodoTextInput extends Component {
  state = {
    errorMessage: null,
  }

  onKeyDown = async (event) => {
    try {
      const { todo } = this.props
      const newName = event.target.value
      if (event.key === 'Enter') {
        const payload = {
          ...todo,
          name: newName,
        }
        await this.props.changeTodo(payload, todo)
        this.props.resetProps()
      }
    } catch (error) {
      this.setState({ errorMessage: error })
    }
  }

  onKeyUp = (event) => {
    const newName = event.target.value
    this.props.onChangeTyping(newName !== this.props.todo.name)
  }

  render() {
    const {
      typing,
      editing,
      todo,
    } = this.props

    return (
      <Fragment>
        { this.state.errorMessage != null ? <AlertPopup type="danger" message={this.state.errorMessage} /> : null }
        <InputText
          defaultValue={todo.name}
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
          {...this.props}
        />
      </Fragment>
    )
  }
}

const TodoTextInputContainer = props => (
  <Compose components={[TodosConsumer, TodoConsumer]}>
    {({ changeTodo }, actions) => (
      <TodoTextInput
        changeTodo={changeTodo}
        {...actions}
        {...props}
      />
    )}
  </Compose>
)

export default TodoTextInputContainer
