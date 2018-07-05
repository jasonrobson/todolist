import React, { Fragment, Component } from 'react';
import _ from 'lodash';
import { FILTER_ALL, FILTER_COMPLETED, FILTER_IN_PROGRESS } from './constants';

const toFilter = filterBy => {
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
  state = {
    todolist: [],
    filterBy: FILTER_ALL,
  };

  render() {
    const todolistFiltered = getFilteredTodos(this.state);

    const filters = [
      { filterBy: FILTER_ALL, label: 'Todas' },
      { filterBy: FILTER_IN_PROGRESS, label: 'Não Completadas' },
      { filterBy: FILTER_COMPLETED, label: 'Completadas' },
    ];

    return (
      <div>
        <div style={{ paddingLeft: '50%' }}>
          <br />
          <br />
          <input
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                const newTodo = {
                  name: event.target.value,
                  isCompleted: false,
                };

                this.setState(prevState => ({
                  todolist: [...prevState.todolist, newTodo],
                }));
              }
            }}
          />
        </div>
        <br />
        {
          todolistFiltered.map((todoItem, index) => {
            return (
              <Fragment key={index}>
                <input
                  key={index}
                  type="checkbox"
                  checked={todoItem.isCompleted}
                  onChange={(event) => {
                    this.state.todolist[index].isCompleted = event.target.checked;
                    this.setState({
                      todolist: this.state.todolist
                    });
                  }}
                />
                <span style={{ backgroundColor: todoItem.isCompleted ? 'gray' : 'white' }}>
                  {todoItem.name}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    this.state.todolist.splice(index, 1);
                    this.setState({ todolist: [...this.state.todolist] });
                  }}
                >
                  Excluir
                </button>
                <br />
              </Fragment>
            );
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
                this.setState({ filterBy });
              }}
            >
              {label}
            </button>
          ))}
        </center>
      </div>
    );
  }
}

export default App;
