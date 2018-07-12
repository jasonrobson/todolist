import React, { Fragment } from 'react'

import Order from './Order'

const Orders = () => (
  <Fragment>
    <Order name="completed">
      Ordenar por Completada
    </Order>
    <Order name="name">
      Ordenar por Nome
    </Order>
  </Fragment>
)

export default Orders
