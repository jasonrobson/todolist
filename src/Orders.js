import React, { Component } from 'react'

export const invertOrder = order => (
  order === 'asc' ? 'desc' : 'asc'
)

export const orders = [
  { label: 'Ordenar por Completada', orderBy: 'completed' },
  { label: 'Ordenar por Nome', orderBy: 'name' },
]

class Orders extends Component {
  state = {
    payload: this.props.initialValues,
  }

  render() {
    const { onChange } = this.props
    const { payload } = this.state

    return orders.map(({ label, orderBy }) => (
      <button
        type="button"
        key={label}
        onClick={() => {
          const newPayload = {
            ...payload,
            [orderBy]: invertOrder(payload[orderBy]),
          }

          this.setState({ payload: newPayload })
          onChange(newPayload)
        }}
      >
        { label }
      </button>
    ))
  }
}

export default Orders
