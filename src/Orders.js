import React, { Fragment } from 'react'

import Order from './Order'

const Orders = () => (
  <Fragment>
    <table>
      <tbody>
        <tr>
          <td>
            <Order name="completed">
              Ordenar por Completada
            </Order>
          </td>
          <td>
            <Order name="name">
              Ordenar por Nome
            </Order>
          </td>
        </tr>
      </tbody>
    </table>
  </Fragment>
)

export default Orders
