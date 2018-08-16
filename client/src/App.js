import React, { Fragment } from 'react'
import TodoListContainer from './Todolist'
import { TodosProvider } from './TodosContext'
import { FilterProvider } from './FilterContext'
import { OrderProvider } from './OrderContext'
import './Main.css'
import TodoInputContainer from './TodoInput'
import { AlertToastProvider } from './AlertToastContext'

const HeaderContent = () => (
  <Fragment>
    <h1 className="todostitle">
      Todos
    </h1>
  </Fragment>
)

const App = () => (
  <AlertToastProvider>
    <OrderProvider>
      <FilterProvider>
        <TodosProvider>
          <div className="todobox">
            <HeaderContent />
            <TodoInputContainer />
            <TodoListContainer />
          </div>
        </TodosProvider>
      </FilterProvider>
    </OrderProvider>
  </AlertToastProvider>
)

export default App
