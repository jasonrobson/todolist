import React, { Fragment, createContext } from 'react'
import _ from 'lodash'
import { FILTER_ALL, FILTER_COMPLETED, FILTER_IN_PROGRESS } from './constants'

const filters = [
  { filterBy: FILTER_ALL, label: 'Todas' },
  { filterBy: FILTER_IN_PROGRESS, label: 'Não Completadas' },
  { filterBy: FILTER_COMPLETED, label: 'Completadas' },
]

export const toFilter = (filterBy) => {
  const mapping = {
    [FILTER_COMPLETED]: { isCompleted: true },
    [FILTER_IN_PROGRESS]: { isCompleted: false },
  }
  const predicate = mapping[filterBy]
  return predicate
    ? _.matches(predicate)
    : _.constant(true)
}

export const FilterContext = createContext({
  filterBy: FILTER_ALL,
  changeFilter: () => {},
})

const Filters = () => (
  <FilterContext.Consumer>
    {
      ({ filterBy: currentFilter, changeFilter }) => {
        return (
          filters.map(({ filterBy, label }) => (
            <Fragment key={filterBy}>
              <button
                key={filterBy}
                type="button"
                onClick={() => { changeFilter(filterBy) }}
              >
                {label}
              </button>
            </Fragment>
          ))
        )
      }
    }
  </FilterContext.Consumer>
)

export default Filters
