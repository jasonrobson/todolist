import React, { Fragment, Component } from 'react';
import { FILTER_ALL, FILTER_COMPLETED, FILTER_IN_PROGRESS } from './constants';
import _ from 'lodash'

class TodoItem {
  constructor(name, isCompleted) {
    this.name = name;
    this.isCompleted = isCompleted;
  }
}

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
  todolist.filter(toFilter('XPTO'))
)

class App extends Component {
  state = {
    todolist: [],
    filterBy: FILTER_ALL,
  };

  render() {
    const todolistFiltered = getFilteredTodos({
      todolist: this.state.todolist,
      filterBy: this.state.filterBy,
    })

    return (
      <div>
        <div style={{ paddingLeft: '50%' }}>
          <br />
          <br />
          <input
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                const novoItem = new TodoItem(event.target.value, false);
                this.setState(prevState => ({
                  todolist: [...prevState.todolist, novoItem],
                }));
              }
            }}
          />
        </div>
        <br />
        {
          todolistFiltered.map((todoItem, index) => {
            return (
              <Fragment>
                <input
                  type="checkbox"
                  checked={todoItem.isCompleted}
                  onChange={(event) => {
                    this.state.todolist[index].isCompleted = event.target.checked;

                    this.setState({
                      todolist: this.state.todolist
                    });
                  }}  
                />
                {todoItem.isCompleted ? (
                  <span style={{ backgroundColor: 'gray' }}>
                    {todoItem.name}
                  </span>
                ) : (
                  <span style={{ backgroundColor: 'white' }}>
                    {todoItem.name}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => {
                    // this.state.todolist.splice(index, 1);
                    // this.setState(prevState => ({
                    //   todolist: [...prevState.todolist],
                    // }));
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
          <button
            type="button"
            onClick={() => {
              this.setState({ filterBy: FILTER_ALL });
            }}
          >
            Todas
          </button>
          <button
            type="button"
            onClick={() => {
              this.setState({ filterBy: FILTER_IN_PROGRESS });
            }}
          >
            Nåo Completadas
          </button>
          <button
            type="button"
            onClick={() => {
              this.setState({ filterBy: FILTER_COMPLETED });
            }}
          >
            Completadas
          </button>
        </center>
      </div>
    );
  }
}

export default App;
