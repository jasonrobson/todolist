import React from 'react'

import Order from './Order'

export const options = [
  { name: 'completed', label: 'Ordenar por Completada' },
  { name: 'name', label: 'Ordenar por Nome' },
]

const Orders = () => (
  options.map(({ label, name }) => (
    <Order
      key={name}
      name={name}
    >
      {label}
    </Order>
  ))
)

export default Orders
