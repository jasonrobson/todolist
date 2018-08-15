import React, { Component, Fragment } from 'react'
import { TodosConsumer } from './TodosContext'
import TrashCanImage from './delete.png'
import AlertPopup from './AlertPopup';

class TodoDelete extends Component {
  state = {
    errorMessage: null,
  }

  render() {
    const {
      todo,
    } = this.props
    return (
      <Fragment>
        { this.state.errorMessage !== null ? <AlertPopup type="danger" message={this.state.errorMessage} /> : null }
        <TodosConsumer>
          {({
            deleteTodo,
          }) => (
            <button
              type="button"
              onClick={async () => {
                try {
                  await deleteTodo(todo)
                } catch (error) {
                  this.setState({ errorMessage: error })
                }
              }}
              style={{
                width: 60,
                height: 35,
                backgroundColor: 'Transparent',
                backgroundRepeat: 'no-repeat',
                border: 'none',
              }}
            >
              <img src={TrashCanImage} style={{ width: 15, height: 15 }} alt="" />
            </button>
          )}
        </TodosConsumer>
      </Fragment>
    )
  }
}

export default TodoDelete
