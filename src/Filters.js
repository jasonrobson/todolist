import React from 'react'
import _ from 'lodash'
import { FILTER_ALL, FILTER_COMPLETED, FILTER_IN_PROGRESS } from './constants'
import Filter from './Filter'

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

const Filters = () => (
  filters.map(({ filterBy, label }) => (
    <Filter key={filterBy} filterBy={filterBy} label={label} />
  ))
)

export default Filters
