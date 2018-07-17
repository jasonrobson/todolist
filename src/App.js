import React from 'react'
import TodoList from './Todolist'
import { TodosProvider } from './TodosContext'
import Filters from './Filters'
import { FilterProvider } from './FilterContext'
import { OrderProvider } from './OrderContext'
import TodoInput from './TodoInput'
import Main from './Main.css'

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
          <TodoList />
          <Filters />
        </div>
      </TodosProvider>
    </FilterProvider>
  </OrderProvider>
)

export default App
