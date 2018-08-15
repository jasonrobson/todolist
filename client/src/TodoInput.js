import React, { Component, Fragment } from 'react'
import { TodosConsumer } from './TodosContext'
import AlertPopup from './AlertPopup'

class TodoInput extends Component {
  state = {
    fieldName: '',
    errorMessage: null,
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
      <Fragment>
        { this.state.errorMessage !== null ? <AlertPopup type="danger" message={this.state.errorMessage} /> : null }
        <TodosConsumer>
          {({ createTodo }) => (
            <input
              className="todoinput"
              placeholder="Write your task and press enter"
              style={{
                minWidth: '500px',
                textAlign: 'center',
              }}
              onKeyDown={async (event) => {
                if (event.key === 'Enter' && event.target.value !== '') {
                  try {
                    const newTodo = {
                      name: event.target.value,
                    }
                    await createTodo(newTodo)
                    this.resetName()
                  } catch (error) {
                    this.setState({errorMessage: error})
                  }
                }
              }}
              onChange={this.handleFieldNameChange}
              value={fieldName}
            />
          )}
        </TodosConsumer>
      </Fragment>
    )
  }
}

export default TodoInput
