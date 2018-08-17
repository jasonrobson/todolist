import React from 'react'
import TodoListContainer from './Todolist'
import { TodosProvider } from './TodosContext'
import { FilterProvider } from './FilterContext'
import { OrderProvider } from './OrderContext'
import './Main.css'
import TodoInputContainer from './TodoInput'
import { AlertToastProvider } from './AlertToastContext'

const HeaderContent = () => (
  <h1 className="todostitle">
    Todos
  </h1>
)

const TodoBox = () => (
  <div className="todobox">
    <HeaderContent />
    <TodoInputContainer />
    <TodoListContainer />
  </div>
)

const App = () => (
  <AlertToastProvider>
    <OrderProvider>
      <FilterProvider>
        <TodosProvider>
          <TodoBox />
        </TodosProvider>
      </FilterProvider>
    </OrderProvider>
  </AlertToastProvider>
)

export default App
