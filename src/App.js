import React from 'react'
import TodoList from './Todolist'
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
          <TodoInput />
          <hr />
          <table>
            <Orders />
            <TodoList />
          </table>
          <hr />
          <BottomToolbar />
        </center>
      </TodosProvider>
    </FilterProvider>
  </OrderProvider>
)

export default App
