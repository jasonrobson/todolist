import React from 'react'

export const invertOrder = (order) => {
  return order === 'asc' ? 'desc' : 'asc'
}

export const orders = [
  { label: 'Ordenar por Completada', orderBy: 'completed' },
  { label: 'Ordenar por Nome', orderBy: 'name' },
]

const Orders = ({ onClick }) => (
  orders.map(({ label, orderBy: currentOrderBy }) => (
    <button
      type="button"
      key={label}
      onClick={() => { onClick(currentOrderBy) }}
    >
      { label }
    </button>
  ))
)

export default Orders
