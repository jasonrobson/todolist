import React, { Component, Fragment } from 'react'
import { Compose } from 'react-powerplug'
import { Button, ButtonGroup } from 'reactstrap'
import { TodosConsumer } from './TodosContext'
import { AlertToastConsumer } from './AlertToastContext'
import { errorCapture } from './ErrorCapture'

class TodoCheck extends Component {

  onClick = errorCapture(async () => {
    const {
      todo,
      changeTodo,
      notify,
    } = this.props
    try {
      const payload = {
        ...todo,
        completed: !todo.completed,
      }
      await changeTodo(payload, todo)
    } catch (error) {
      notify('error', error.message)
    }
  })

  render() {
    const {
      todo,
    } = this.props
    return (
      <Fragment>
        <ButtonGroup>
          <Button
            color={todo.completed ? "secondary" : "primary"}
            id={todo.id}
            active={todo.completed}
            style={{ width: 35, height: 35, color: 'white' }}
            onClick={this.onClick}
          >
            {todo.completed ? '✔' : ''}
          </Button>
        </ButtonGroup>
      </Fragment>
    )
  }
}

const TodoCheckContainer = props => (
  <Compose components={[TodosConsumer, AlertToastConsumer]}>
    {({ changeTodo }, { notify }) => (
      <TodoCheck
        changeTodo={changeTodo}
        notify={notify}
        {...props}
      />
    )}
  </Compose>
)

export default TodoCheckContainer
