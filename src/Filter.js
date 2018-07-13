import React from 'react'

import { FilterConsumer } from './FilterContext'

const Filter = ({ filterBy, label, ...props }) => (
  <FilterConsumer>
    {({ changeFilter }) => (
      <button
        key={filterBy}
        type="button"
        onClick={() => { changeFilter(filterBy) }}
        {...props}
      >
        {label}
      </button>
    )}
  </FilterConsumer>
)

export default Filter
