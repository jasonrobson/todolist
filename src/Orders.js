import React, { Component, createContext, Fragment } from 'react'

export const invertOrder = order => (
  order === 'asc' ? 'desc' : 'asc'
)

export const orders = [
  { label: 'Ordenar por Completada', orderBy: 'completed' },
  { label: 'Ordenar por Nome', orderBy: 'name' },
]

export const OrderContext = createContext({ completed: 'asc', name: 'asc' })

class Orders extends Component {
  render() {
    const { onChange } = this.props

    return orders.map(({ label, orderBy }) => (
      <Fragment key={label}>
        <OrderContext.Consumer>
          {currentOrderBy => (
            <button
              type="button"
              key={label}
              onClick={() => {
                const newPayload = {
                  ...currentOrderBy,
                  [orderBy]: invertOrder(currentOrderBy[orderBy]),
                }
                onChange(newPayload)
              }}
            >
              { label }
            </button>
          )}
        </OrderContext.Consumer>
      </Fragment>
    ))
  }
}

export default Orders
