import React, { Component, createContext } from 'react'

export const nextOrder = orderBy => (
  orderBy === 'asc' ? 'desc' : 'asc'
)

const Context = createContext({
  orders: {},
  invertOrder: () => {},
})

export class OrderProvider extends Component {
  state = {
    orders: {
      completed: 'asc',
      name: 'asc',
    },
  }

  invertOrder = (name) => {
    this.setState(state => ({
      orders: {
        ...state.orders,
        [name]: nextOrder(state.orders[name]),
      },
    }))
  }

  render() {
    const value = {
      ...this.state,
      invertOrder: this.invertOrder,
    }

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const { Consumer: OrderConsumer } = Context
