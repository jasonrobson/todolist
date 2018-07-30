import React from 'react'

import { OrderConsumer } from './OrderContext'

const Order = ({ name, ...props }) => (
  <OrderConsumer>
    {({ invertOrder }) => (
      <span
        onClick={() => invertOrder(name)}
        {...props}
      />
    )}
  </OrderConsumer>
)

export default Order
