import React, { Fragment } from 'react'

import Order from './Order'

const Orders = () => (
  <thead>
    <tr>
      <th>
        <Order name="completed">
          Ordenar por Completada
        </Order>
      </th>
      <th>
        <Order name="name">
          Ordenar por Nome
        </Order>
      </th>
    </tr>
  </thead>
)

export default Orders
