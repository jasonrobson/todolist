import React from 'react'
import { Button } from 'reactstrap'

import { FilterConsumer } from './FilterContext'

const Filter = ({ filterBy, label, ...props }) => (
  <FilterConsumer>
    {({ changeFilter }) => (
      <Button
        outline color="danger"
        type="button"
        onClick={() => { changeFilter(filterBy) }}
        {...props}
      >
        {label}
      </Button>
    )}
  </FilterConsumer>
)

export default Filter
