import React, { Component } from 'react'


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
    const { onChange, maxId } = this.props
    return (
      <input
        onKeyDown={(event) => {
          if (event.key === 'Enter' && event.target.value !== '') {
            const newTodo = {
              id: maxId + 1,
              isCompleted: false,
              name: event.target.value,
            }
            onChange(newTodo)
            this.resetName()
          }
        }}
        onChange={this.handleFieldNameChange}
        value={fieldName}
      />
    )
  }
}

export default Registerer
