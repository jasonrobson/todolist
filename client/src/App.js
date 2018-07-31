import React from 'react'
import TodoList from './Todolist'
import { TodosProvider, TodosConsumer } from './TodosContext'
import { FilterProvider } from './FilterContext'
import { OrderProvider } from './OrderContext'
import TodoInput from './TodoInput'
import './Main.css'

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
          <TodosConsumer>
            {({ initializeTodos }) => (
              <TodoList initializeTodos={initializeTodos} />
            )}
          </TodosConsumer>
        </div>
      </TodosProvider>
    </FilterProvider>
  </OrderProvider>
)

export default App
