import React, { Component, Fragment } from 'react'
import { TodosConsumer } from './TodosContext'
import { TodoConsumer } from './TodoContext'
import AlertPopup from './AlertPopup'

const getBackgroundColor = (typing) => {
  if (typing) {
    return 'red'
  }
  return 'white'
}

class TodoTextInput extends Component {
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
            <TodoConsumer>
              {({
                editing,
                typing,
                onChangeTyping,
                resetProps,
              }) => (
                <input
                  style={{
                    backgroundColor: getBackgroundColor(typing),
                    visibility: editing ? 'visible' : 'hidden',
                    position: editing ? 'relative' : 'absolute',
                    width: '200px',
                  }}
                  defaultValue={todo.name}
                  onKeyDown={async (event) => {
                    try {
                      const newName = event.target.value
                      if (event.key === 'Enter') {
                        const payload = {
                          ...todo,
                          name: newName,
                        }
                        await changeTodo(payload, todo)
                        resetProps()
                      }
                    } catch (error) {
                      this.setState({ errorMessage: error })
                    }
                  }}
                  onKeyUp={(event) => {
                    const newName = event.target.value
                    onChangeTyping(newName !== todo.name)
                  }}
                />
              )}
            </TodoConsumer>
          )}
        </TodosConsumer>
      </Fragment>
    )
  }
}

export default TodoTextInput
