import React, { Fragment } from 'react'
import TodoList from './Todolist'
import { TodosProvider } from './TodosContext'
import Filters from './Filters'
import { FilterProvider } from './FilterContext'
import Orders from './Orders'
import { OrderProvider } from './OrderContext'
import TodoInput from './TodoInput'
import Main from './Main.css'

const BottomToolbar = () => (
  <Fragment>
    <h3 className="filterstitle">
      Filtrar por
    </h3>
    <Filters />
  </Fragment>
)

const HeaderContent = () => (
  <h1 className="todostitle">
    Todos
  </h1>
)

const App = () => (
  <OrderProvider>
    <FilterProvider>
      <TodosProvider>
        <div className="todobox">
          <HeaderContent />
          <TodoInput />
          <hr />
          <table>
            <Orders />
            <TodoList />
          </table>
          <hr />
          <BottomToolbar />
        </div>
      </TodosProvider>
    </FilterProvider>
  </OrderProvider>
)

export default App
