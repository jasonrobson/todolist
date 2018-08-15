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
    error: null,
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
      this.setState({ error })
    }
  }

  onKeyUp = (event) => {
    const newName = event.target.value
    this.props.onChangeTyping(newName !== this.props.todo.name)
  }

  render() {
    const { todo } = this.props

    return (
      <Fragment>
        { this.state.error != null ? <AlertPopup type="danger" error={this.state.error} onDismiss={() => this.setState({ error: null })} /> : null }
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
