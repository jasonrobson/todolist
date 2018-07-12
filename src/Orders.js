import React, { Component, createContext, Fragment } from 'react'

export const invertOrder = order => (
  order === 'asc' ? 'desc' : 'asc'
)

export const orders = [
  { label: 'Ordenar por Completada', orderBy: 'completed' },
  { label: 'Ordenar por Nome', orderBy: 'name' },
]

export const OrderContext = createContext({
  orderBy: { completed: 'asc', name: 'asc' },
  changeOrders: () => {},
})

class Orders extends Component {
  render() {
    return orders.map(({ label, orderBy: orderByMap }) => (
      <Fragment key={label}>
        <OrderContext.Consumer>
          { ({ orderBy: currentOrderBy, changeOrders }) => (
            <button
              type="button"
              key={label}
              onClick={() => {
                const payload = {
                  ...currentOrderBy,
                  [orderByMap]: invertOrder(currentOrderBy[orderByMap]),
                }
                changeOrders(payload)
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
