import React, { Component, createContext, Fragment } from 'react'
import { toast, ToastContainer } from 'mdbreact'

export const Context = createContext({
  notify: () => {},
})

export class AlertToastProvider extends Component {
  state = {
    notify: this.notify,
  }

  notify = (type, message) => {
    switch (type) {
      case 'success':
        toast.success(message, {
          position: 'top-right',
        })
        break
      case 'warning':
        toast.warn(message)
        break
      case 'error':
        toast.error(message)
        break
      default:
        toast.info(message, {
          autoClose: 3000,
        })
        break
    }
  }

  // componentDidCatch(error, info) {
  //   this.notify('error', error)
  // }

  render() {
    const value = {
      ...this.state,
      notify: this.notify,
    }

    return (
      <Fragment>
        <Context.Provider value={value}>
          {this.props.children}
        </Context.Provider>
        <ToastContainer
          hideProgressBar
          newestOnTop
          autoClose={5000}
        />
      </Fragment>
    )
  }
}

export const { Consumer: AlertToastConsumer } = Context
