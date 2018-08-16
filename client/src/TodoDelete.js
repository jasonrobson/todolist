import React, { Component, Fragment } from 'react'
import { Compose } from 'react-powerplug'
import styled from 'styled-components'
import { TodosConsumer } from './TodosContext'
import TrashCanImage from './delete.png'
import { AlertToastConsumer } from './AlertToastContext'

const InputButton = styled.button`
  width: 60px;
  height: 35px;
  background-Color: Transparent;
  background-Repeat: no-repeat;
  border: none;
`

const InputImg = styled.img`
  width: 15px;
  height: 15px;
`

class TodoDelete extends Component {
  onClick = async () => {
    const {
      todo,
      deleteTodo,
      notify,
    } = this.props
    try {
      await deleteTodo(todo)
    } catch (error) {
      notify('error', error.message)
    }
  }

  render() {
    return (
      <Fragment>
        <InputButton
          type="button"
          onClick={this.onClick}
        >
          <InputImg src={TrashCanImage} alt="" />
        </InputButton>
      </Fragment>
    )
  }
}

const TodoDeleteContainer = props => (
  <Compose components={[AlertToastConsumer, TodosConsumer]}>
    {({ notify }, { deleteTodo }) => (
      <TodoDelete
        deleteTodo={deleteTodo}
        notify={notify}
        {...props}
      />
    )}
  </Compose>
)

export default TodoDeleteContainer
