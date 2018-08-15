import React, { Component, Fragment } from 'react'
import { Button, ButtonGroup } from 'reactstrap'
import { TodosConsumer } from './TodosContext'
import AlertPopup from './AlertPopup'

class TodoCheck extends Component {
  state = {
    errorMessage: null,
  }

  render() {
    const {
      todo,
    } = this.props
    return (
      <Fragment>
        { this.state.errorMessage != null ? <AlertPopup type={"danger"} message={this.state.errorMessage} /> : null }
        <TodosConsumer>
          {({
            changeTodo,
          }) => (
            <ButtonGroup>
              <Button
                color={todo.completed ? "secondary" : "primary"}
                id={todo.id}
                active={todo.completed}
                style={{ width: 35, height: 35, color: 'white' }}
                onClick={
                  async () => {
                    try {
                      const payload = {
                        ...todo,
                        completed: !todo.completed,
                      }
                      await changeTodo(payload, todo)
                    } catch (error) {
                      this.setState({ errorMessage: error })
                    }
                  }}
              >
                {todo.completed ? '✔' : ''}
              </Button>
            </ButtonGroup>
          )}
        </TodosConsumer>
      </Fragment>
    )
  }
}

export default TodoCheck
