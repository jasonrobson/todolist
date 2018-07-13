import React from 'react'
import TodoList from './TodoList'
import { TodosProvider } from './TodosContext'
import Filters from './Filters'
import { FilterProvider } from './FilterContext'
import Orders from './Orders'
import { OrderProvider } from './OrderContext'
import TodoInput from './TodoInput'

const BottomToolbar = () => (
  <center>
    <h3>
      Filtrar por
    </h3>
    <Filters />
  </center>
)

const App = () => (
  <OrderProvider>
    <FilterProvider>
      <TodosProvider>
        <center>
          <br />
          <Orders />
          <br />
          <TodoInput />
          <br />
          <br />
          <hr />
          <br />
          <TodoList />
          <br />
          <br />
          <hr />
          <BottomToolbar />
        </center>
      </TodosProvider>
    </FilterProvider>
  </OrderProvider>
)

export default App
