import React, { Component, createContext } from 'react'
import { FILTER_ALL } from './constants';

const Context = createContext({
  filterBy: '',
  changeFilter: () => {},
})

export class FilterProvider extends Component {
  state = {
    filterBy: FILTER_ALL,
  }

  changeFilter = (payload) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        filterBy: payload,
      }
    })
  }

  render() {
    const value = {
      ...this.state,
      changeFilter: this.changeFilter,
    }
    //console.log(this.state.filterBy)
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const { Consumer: FilterConsumer } = Context
