import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PETS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PETS,
  UPDATE_FILTERS,
  FILTER_PETS,
  CLEAR_FILTERS,
} from '../actions'
import { usePetsContext } from './pets_context'

const initialState = {
  filtered_pets: [],
  all_pets: [], 
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false
  }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const {pets} = usePetsContext()
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({type: LOAD_PETS, payload: pets })
  }, [pets])

  useEffect(() => {
    dispatch({type: SORT_PETS})
  }, [pets, state.sort])

  useEffect(() => {
    dispatch({type: FILTER_PETS})
    dispatch({type: SORT_PETS})
  }, [pets, state.sort, state.filters])

  const setGridView = () => {
    dispatch({type: SET_GRIDVIEW})
  }

  const setListView = () => {
    dispatch({type: SET_LISTVIEW})
  }

  const updateSort = (e) => {
    const value = e.target.value
    dispatch({type: UPDATE_SORT, payload: value})
  }

  const updateFilters = (e) => {
    let name = e.target.name
    let value = e.target.value

    if(name === 'category') {
      value = e.target.textContent
    }

    if(name === 'color') {
      value = e.target.dataset.color
    }

    if(name === 'price') {
      value = Number(value)
    }

    if(name === 'shipping') {
      value = e.target.checked
    }

    dispatch({type: UPDATE_FILTERS, payload: {name, value}})
  }

  const clearFilters = () => {
    dispatch({type: CLEAR_FILTERS})
  }

  return (
    <FilterContext.Provider value={{...state, setGridView, setListView, updateSort, updateFilters, clearFilters}}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
