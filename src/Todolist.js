import React, { Fragment, Component } from 'react'

class Todolist extends Component {
  render() {
    const {
      todolist,
      onChange,
      onDelete,
    } = this.props
    return (
      todolist.map(todoItem => (
        <Fragment key={todoItem.id}>
          <input
            type="checkbox"
            checked={todoItem.isCompleted}
            onChange={(event) => { onChange(todoItem, { isCompleted: event.target.checked }) }}
          />
          <span style={{ backgroundColor: todoItem.isCompleted ? 'gray' : 'white' }}>
            {todoItem.name}
          </span>
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
