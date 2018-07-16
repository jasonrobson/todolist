import React, { Fragment } from 'react'

import Order from './Order'

const Orders = () => (
  <thead>
    <tr>
      <th style={{ width: '49%', textAlign: 'center' }}>
        <Order name="completed">
          Ordenar por Completada
        </Order>
      </th>
      <th style={{ width: '49%', textAlign: 'center' }}>
        <Order name="name">
          Ordenar por Nome
        </Order>
      </th>
    </tr>
  </thead>
)

export default Orders
