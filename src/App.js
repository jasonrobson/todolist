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

const invertOrder = (order) => {
  return order === 'asc' ? 'desc' : 'asc'
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      fieldName: '',
      maxId: 0,
      todolist: [],
      filterBy: FILTER_ALL,
      orderBy: { completed: 'asc', name: 'asc' },
    }
  }

  handleFieldNameChange = (evt) => {
    this.setState({ fieldName: evt.target.value })
  }

  resetName = () => {
    this.setState({ fieldName: '' })
  }

  render() {
    let todolistFiltered = getFilteredTodos(this.state)
    todolistFiltered = _.orderBy(todolistFiltered, ['isCompleted', 'name'],
      [this.state.orderBy.completed, this.state.orderBy.name])
    const filters = [
      { filterBy: FILTER_ALL, label: 'Todas' },
      { filterBy: FILTER_IN_PROGRESS, label: 'Não Completadas' },
      { filterBy: FILTER_COMPLETED, label: 'Completadas' },
    ]
    const orders = [
      { label: 'Ordenar por Completada', orderBy: 'completed' },
      { label: 'Ordenar por Nome', orderBy: 'name' },
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
        {
          orders.map(({ label, orderBy }) => {
            return (
              <button
                type="button"
                key={label}
                onClick={() => {
                  const newOrderBy = (orderBy === 'completed' ? (
                    {
                      completed: invertOrder(this.state.orderBy.completed),
                      name: this.state.orderBy.name,
                    }
                  ) : (
                    {
                      completed: this.state.orderBy.completed,
                      name: invertOrder(this.state.orderBy.name),
                    }
                  )
                  )
                  this.setState({ orderBy: newOrderBy })
                }}
              >
                { label }
              </button>
            )
          })
        }
        <br />
        {
          todolistFiltered.map((todoItem) => {
            return (
              <ShowList
                key={todoItem.id}
                todoItem={todoItem}
                excludeEvent={
                () => {
                  const newlist = this.state.todolist.filter((todoFilter) => {
                    return (todoFilter.id !== todoItem.id)
                  })
                  this.setState({ todolist: newlist })
                }
              }
                checkEvent={
                  (event) => {
                    const element = this.state.todolist.find((todoFilter) => {
                      return (todoFilter.id === todoItem.id)
                    })
                    element.isCompleted = event.target.checked
                    this.setState({ todolist: this.state.todolist })
                  }
              }
              />
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

class ShowList extends Component {
  render()
  {
    return (
      <Fragment>
        <input
          type="checkbox"
          checked={this.props.todoItem.isCompleted}
          onChange={this.props.checkEvent}
        />
        <span style={{ backgroundColor: this.props.todoItem.isCompleted ? 'gray' : 'white' }}>
          {this.props.todoItem.name}
        </span>
        <button
          type="button"
          onClick={this.props.excludeEvent}
        >
          Excluir
        </button>
        <br />
      </Fragment>
    );
  }
}

export default App
