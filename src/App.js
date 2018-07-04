import React, { Fragment, Component } from "react";
import filtros from "./constants";

class TodoItem
{
  constructor(name, isCompleted)
  {
    this.name = name;
    this.isCompleted = isCompleted;
  }
}

class App extends Component {
  state = {
    todolist: [],
    estado: filtros.FILTRO_TODAS
  };

  render() {
    return (
      <div>
        <pre>                    
          {JSON.stringify(this.state.todolist)}
          {JSON.stringify(this.state.estado)}
        </pre>
        <input
          onKeyDown={event => {
            if (event.key === "Enter") {
              const novoItem = new TodoItem(event.target.value, false);
              this.setState({
                todolist: [...this.state.todolist, novoItem]
              });
            }
          }}
        />
        <br />

        
        {this.state.todolist.map(({ name, isCompleted }, index) => {
          switch (this.state.estado) {
            case filtros.FILTRO_COMPLETADA:
              if (isCompleted) {
                return (
                  <Fragment>
                    <input
                      type="checkbox"
                      checked
                      onChange={event => {
                        if (
                          event.target.checked !==
                          isCompleted
                        ) {                          
                          this.state.todolist[index].isCompleted = event.target.checked
                          this.setState({
                            todolist: [...this.state.todolist]
                          });
                        }
                      }}
                    />
                    {isCompleted ? (
                      <span style={{ backgroundColor: "gray" }}>{name}</span>
                    ) : (
                      <span style={{ backgroundColor: "white" }}>{name}</span>
                    )}
                    <button
                      onClick={event => {                        
                        this.state.todolist.splice(index, 1);
                        this.setState({
                          todolist : [...this.state.todolist]
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
              if (!isCompleted) {
                return (
                  <Fragment>
                    <input
                      type="checkbox"
                      onChange={event => {
                        if (
                          event.target.checked !==
                          isCompleted
                        ) {                          
                          this.state.todolist[index].isCompleted = event.target.checked
                          this.setState({
                            todolist : [...this.state.todolist]
                          });
                        }
                      }}
                    />
                    {isCompleted ? (
                      <span style={{ backgroundColor: "gray" }}>{name}</span>
                    ) : (
                      <span style={{ backgroundColor: "white" }}>{name}</span>
                    )}
                    <button
                      onClick={event => {
                        this.state.todolist.splice(index, 1);
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
                  {isCompleted ? (
                    <input
                      type="checkbox"
                      checked
                      onChange={event => {
                        if (
                          event.target.checked !==
                          isCompleted
                        ) {
                          this.state.todolist[index].isCompleted = event.target.value
                          this.setState({
                            todolist: [...this.state.todolist]
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
                          isCompleted
                        ) {
                          this.state.todolist[index].isCompleted = event.target.value                          
                          this.setState({
                            todolist: [...this.state.todolist]
                          });
                        }
                      }}
                    />
                  )}

                  {isCompleted ? (
                    <span style={{ backgroundColor: "gray" }}>{name}</span>
                  ) : (
                    <span style={{ backgroundColor: "white" }}>{name}</span>
                  )}
                  <button
                    onClick={event => {
                      this.state.todolist.splice(index, 1);
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