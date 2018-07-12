import React, { Component, createContext } from 'react'

export const RegistererContext = createContext({
  maxId: 0,
  changeRegisterer: () => {},
})

class Registerer extends Component {
  state = {
    fieldName: '',
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
      <RegistererContext.Consumer>
        {({ maxId, changeRegisterer }) => (
          <input
            onKeyDown={(event) => {
              if (event.key === 'Enter' && event.target.value !== '') {
                const newTodo = {
                  id: maxId + 1,
                  isCompleted: false,
                  name: event.target.value,
                }
                changeRegisterer(newTodo)
                this.resetName()
              }
            }}
            onChange={this.handleFieldNameChange}
            value={fieldName}
          />
        )}
      </RegistererContext.Consumer>
    )
  }
}

export default Registerer
