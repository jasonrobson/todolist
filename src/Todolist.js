import React, { Fragment, Component } from 'react'

class Todolist extends Component {
  constructor() {
    super()
    this.state = {
      fieldBeingChanged: 0,
    }
  }

  getBackgroundColor = (field, todoItem) => {
    let retorno = 'white'
    if (field === todoItem.id) {
      retorno = 'red'
    } else if (todoItem.isCompleted) {
      retorno = 'lightgray'
    }
    return retorno
  }

  render() {
    const {
      todolist,
      onChange,
      onDelete,
    } = this.props
    const {
      fieldBeingChanged,
    } = this.state
    return (
      todolist.map(todoItem => (
        <Fragment key={todoItem.id}>
          <input
            type="checkbox"
            checked={todoItem.isCompleted}
            onChange={(event) => { onChange(todoItem, { isCompleted: event.target.checked }) }}
          />
          <input
            ref={todoItem.id}
            style={{
              backgroundColor: this.getBackgroundColor(fieldBeingChanged, todoItem),
            }}
            defaultValue={todoItem.name}
            onKeyDown={
              (event) => {
                const newname = event.target.value
                if (event.key === 'Enter' && newname !== '') {
                  onChange(todoItem, { name: newname })
                  this.setState({ fieldBeingChanged: 0 })
                }
              }
            }
            onBlur={() => { this.setState({ fieldBeingChanged: 0 }) }}
            onChange={() => { this.setState({ fieldBeingChanged: todoItem.id }) }}
          />
          <button
            type="button"
            onClick={() => onDelete(todoItem)}
          >
            Excluir
          </button>
          <br />
        </Fragment>
      ))
    )
  }
}

export default Todolist
