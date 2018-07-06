import React, { Fragment, Component } from 'react'
import _ from 'lodash'
import { FILTER_ALL, FILTER_COMPLETED, FILTER_IN_PROGRESS } from './constants'

const toFilter = (filterBy) => {
  const mapping = {
    [FILTER_COMPLETED]: { isCompleted: true },
    [FILTER_IN_PROGRESS]: { isCompleted: false },
  }

  const predicate = mapping[filterBy]

  return predicate
    ? _.matches(predicate)
    : _.constant(true)
}

const getFilteredTodos = ({ todolist, filterBy }) => (
  todolist.filter(toFilter(filterBy))
)

class App extends Component {
  constructor() {
    super()
    this.state = {
      fieldName: '',
      maxId: 0,
      todolist: [],
      filterBy: FILTER_ALL,
    }
  }

  handleFieldNameChange = (evt) => {
    this.setState({ fieldName: evt.target.value })
  }

  resetName = () => {
    this.setState({ fieldName: '' })
  }

  render() {
    const todolistFiltered = getFilteredTodos(this.state)

    const filters = [
      { filterBy: FILTER_ALL, label: 'Todas' },
      { filterBy: FILTER_IN_PROGRESS, label: 'Não Completadas' },
      { filterBy: FILTER_COMPLETED, label: 'Completadas' },
    ]

    return (
      <div>
        <div style={{ paddingLeft: '50%' }}>
          <br />
          <br />
          <input
            onBlur={this.resetName}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                const newTodo = {
                  id: this.state.maxId + 1,
                  name: event.target.value,
                  isCompleted: false,
                }
                this.setState(prevState => ({
                  todolist: [...prevState.todolist, newTodo],
                  maxId: this.state.maxId + 1,
                }))
              }
            }}
            onChange={this.handleFieldNameChange}
            value={this.state.fieldName}
          />
        </div>
        <br />
        <br />
        {
          todolistFiltered.map((todoItem) => {
            return (
              <Fragment key={todoItem.id}>
                <input
                  type="checkbox"
                  checked={todoItem.isCompleted}
                  onChange={(event) => {
                    const element = this.state.todolist.find((todoFilter) => {
                      return (todoFilter.id === todoItem.id)
                    })
                    element.isCompleted = event.target.checked
                    this.setState({
                      todolist: this.state.todolist
                    })
                  }}
                />
                <span style={{ backgroundColor: todoItem.isCompleted ? 'gray' : 'white' }}>
                  {todoItem.name}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const todoListFiltered = this.state.todolist.filter((todoFilter) => {
                      return (todoFilter.id !== todoItem.id)
                    })
                    this.setState({ todolist: todoListFiltered })
                  }}
                >
                  Excluir
                </button>
                <br />
              </Fragment>
            )
          })
        }
        <hr />
        <center>
          <h3>
            Filtrar por
          </h3>
          {filters.map(({ filterBy, label }) => (
            <button
              key={filterBy}
              type="button"
              onClick={() => {
                this.setState({ filterBy })
              }}
            >
              {label}
            </button>
          ))}
        </center>
      </div>
    )
  }
}

export default App
