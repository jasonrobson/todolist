import React, { Fragment, Component } from 'react';
import filtros from './constants';
//import { list } from 'postcss';

class TodoItem {
  constructor(name, isCompleted) {
    this.name = name;
    this.isCompleted = isCompleted;
  }
}

class App extends Component {
  state = {
    todolist: [],
    estado: filtros.FILTRO_TODAS,
    listaMostrar: [],
  };

  render() {
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
          (() => {
            switch (this.state.estado) {
              case filtros.FILTRO_COMPLETADA:
                this.state.listaMostrar = this.state.todolist.filter((todoItem) => {
                  return (todoItem.isCompleted === true);
                });
                break;
              case filtros.FILTRO_NAOCOMPLETADA:
                this.state.listaMostrar = this.state.todolist.filter((todoItem) => {
                  return (todoItem.isCompleted === false);
                });
                break;
              default:
                this.state.listaMostrar = this.state.todolist;
                break;
            }
          })()
        }
        {
          this.state.listaMostrar.map((todoItem) => {
            return (
              <Fragment>
                <input
                  type="checkbox"
                  checked
                  onChange={(event) => {
                    if (
                      event.target.checked !== todoItem.isCompleted
                    ) {
                      // this.state.todolist[index].isCompleted = event.target.checked;
                      // this.setState(prevState => ({
                      //   todolist: [...prevState.todolist],
                      // }));
                    }
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
              this.setState({ estado: filtros.FILTRO_TODAS });
            }}
          >
            Todas
          </button>
          <button
            type="button"
            onClick={() => {
              this.setState({ estado: filtros.FILTRO_NAOCOMPLETADA });
            }}
          >
            Nåo Completadas
          </button>
          <button
            type="button"
            onClick={() => {
              this.setState({ estado: filtros.FILTRO_COMPLETADA });
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
