import React, { Fragment, Component } from "react";
import ReactDOM from "react-dom";
import filtros from "./constants";

function addAfter(array, index, newItem) {
  return [...array.slice(0, index), newItem, ...array.slice(index)];
}

class App extends Component {
  state = {
    todolist: [],
    todoListCompleted: [],
    estado: filtros.FILTRO_TODAS
  };

  render() {
    return (
      <div>
        <pre>
          {JSON.stringify(this.state.todoListCompleted)}
          {JSON.stringify(this.state.estado)}
        </pre>
        <input
          onKeyDown={event => {
            if (event.key === "Enter") {
              this.setState({
                todolist: [...this.state.todolist, event.target.value],
                todoListCompleted: [...this.state.todoListCompleted, false]
              });
            }
          }}
        />
        <br />
        {this.state.todolist.map((text, index) => {
          switch (this.state.estado) {
            case filtros.FILTRO_COMPLETADA:
              if (this.state.todoListCompleted[index]) {
                return (
                  <Fragment>
                    <input
                      type="checkbox"
                      checked
                      onChange={event => {
                        if (
                          event.target.checked !==
                          this.state.todoListCompleted[index]
                        ) {
                          this.state.todoListCompleted.splice(
                            index,
                            1,
                            event.target.checked
                          );
                          this.setState({
                            todoListCompleted: [...this.state.todoListCompleted]
                          });
                        }
                      }}
                    />
                    {this.state.todoListCompleted[index] ? (
                      <span style={{ backgroundColor: "gray" }}>{text}</span>
                    ) : (
                      <span style={{ backgroundColor: "white" }}>{text}</span>
                    )}
                    <button
                      onClick={event => {
                        this.state.todoListCompleted.splice(index, 1);
                        this.state.todolist.splice(index, 1);
                        this.setState({
                          todoListCompleted: [...this.state.todoListCompleted]
                        });
                        this.setState({
                          todolist: [...this.state.todolist]
                        });
                      }}
                    >
                      Excluir
                    </button>
                    <br />
                  </Fragment>
                );
              } else {
                return null;
              }
            case filtros.FILTRO_NAOCOMPLETADA:
              if (!this.state.todoListCompleted[index]) {
                return (
                  <Fragment>
                    <input
                      type="checkbox"
                      onChange={event => {
                        if (
                          event.target.checked !==
                          this.state.todoListCompleted[index]
                        ) {
                          this.state.todoListCompleted.splice(
                            index,
                            1,
                            event.target.checked
                          );
                          this.setState({
                            todoListCompleted: [...this.state.todoListCompleted]
                          });
                        }
                      }}
                    />
                    {this.state.todoListCompleted[index] ? (
                      <span style={{ backgroundColor: "gray" }}>{text}</span>
                    ) : (
                      <span style={{ backgroundColor: "white" }}>{text}</span>
                    )}
                    <button
                      onClick={event => {
                        this.state.todoListCompleted.splice(index, 1);
                        this.state.todolist.splice(index, 1);
                        this.setState({
                          todoListCompleted: [...this.state.todoListCompleted]
                        });
                        this.setState({
                          todolist: [...this.state.todolist]
                        });
                      }}
                    >
                      Excluir
                    </button>
                    <br />
                  </Fragment>
                );
              } else {
                return null;
              }
            default:
              return (
                <Fragment>
                  {this.state.todoListCompleted[index] ? (
                    <input
                      type="checkbox"
                      checked
                      onChange={event => {
                        if (
                          event.target.checked !==
                          this.state.todoListCompleted[index]
                        ) {
                          this.state.todoListCompleted.splice(
                            index,
                            1,
                            event.target.checked
                          );
                          this.setState({
                            todoListCompleted: [...this.state.todoListCompleted]
                          });
                        }
                      }}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      onChange={event => {
                        if (
                          event.target.checked !==
                          this.state.todoListCompleted[index]
                        ) {
                          this.state.todoListCompleted.splice(
                            index,
                            1,
                            event.target.checked
                          );
                          this.setState({
                            todoListCompleted: [...this.state.todoListCompleted]
                          });
                        }
                      }}
                    />
                  )}

                  {this.state.todoListCompleted[index] ? (
                    <span style={{ backgroundColor: "gray" }}>{text}</span>
                  ) : (
                    <span style={{ backgroundColor: "white" }}>{text}</span>
                  )}
                  <button
                    onClick={event => {
                      this.state.todoListCompleted.splice(index, 1);
                      this.state.todolist.splice(index, 1);
                      this.setState({
                        todoListCompleted: [...this.state.todoListCompleted]
                      });
                      this.setState({
                        todolist: [...this.state.todolist]
                      });
                    }}
                  >
                    Excluir
                  </button>
                  <br />
                </Fragment>
              );
          }
        })}
        <hr />
        <center>
          <h3>Filtrar por</h3>
          <button
            onClick={event => {
              this.setState({ estado: filtros.FILTRO_TODAS });
            }}
          >
            Todas
          </button>
          <button
            onClick={event => {
              this.setState({ estado: filtros.FILTRO_NAOCOMPLETADA });
            }}
          >
            Nåo Completadas
          </button>
          <button
            onClick={event => {
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

export default App