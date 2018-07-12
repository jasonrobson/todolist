import React from 'react'

import { OrderConsumer } from './OrderContext'

const Order = ({ name, ...props }) => (
  <OrderConsumer>
    {({ invertOrder }) => (
      <button
        type="button"
        onClick={() => invertOrder(name)}
        {...props}
      />
    )}
  </OrderConsumer>
)

export default Order
