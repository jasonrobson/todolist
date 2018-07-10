import React from 'react'

export const invertOrder = order => (
  order === 'asc' ? 'desc' : 'asc'
)

export const orders = [
  { label: 'Ordenar por Completada', orderBy: 'completed' },
  { label: 'Ordenar por Nome', orderBy: 'name' },
]

const Orders = ({ onClick }) => (
  orders.map(({ label, orderBy }) => (
    <button
      type="button"
      key={label}
      onClick={() => { onClick(orderBy) }}
    >
      { label }
    </button>
  ))
)

export default Orders
