import React, { Fragment } from 'react'
import { Compose } from 'react-powerplug'
import TodoList from './Todolist'
import { TodosProvider, TodosConsumer } from './TodosContext'
import { FilterProvider } from './FilterContext'
import { OrderProvider } from './OrderContext'
import './Main.css'
import TodoInputContainer from './TodoInput'
import { AlertToastProvider, AlertToastConsumer } from './AlertToastContext'

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
            <Compose components={[AlertToastConsumer, TodosConsumer]}>
              {({ notify }, { initializeTodos }) => (
                <TodoList notify={notify} initializeTodos={initializeTodos} />
              )}
            </Compose>
          </div>
        </TodosProvider>
      </FilterProvider>
    </OrderProvider>
  </AlertToastProvider>
)

export default App
