import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/pets_reducer'

import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PETS_BEGIN,
  GET_PETS_SUCCESS,
  GET_PETS_ERROR,
  GET_SINGLE_PET_BEGIN,
  GET_SINGLE_PET_SUCCESS,
  GET_SINGLE_PET_ERROR,
} from '../actions'
import {pets} from '../utils/data'

const initialState = {
  isSidebarOpen: false,
  pets_loading: false,
  pets_error: false,
  pets: [],
  featured_pets: [],
  single_pet_loading:false,
  single_pet_error:false,
  single_pet:{}
}

const PetsContext = React.createContext()

export const PetsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const openSidebar = () => {
    dispatch({type: SIDEBAR_OPEN })
  }

  const closeSidebar = () => {
    dispatch({type: SIDEBAR_CLOSE })
  }

  const fetchPets = () => {
    dispatch({ type: GET_PETS_BEGIN })
    dispatch({type: GET_PETS_SUCCESS, payload: pets})
  }

  const fetchSinglePet = (id) => {
    dispatch({type: GET_SINGLE_PET_BEGIN})
    const singlePet = pets.filter((pet) => pet.id === id)
    dispatch({type: GET_SINGLE_PET_SUCCESS, payload: singlePet[0]})
  }

  useEffect(() => {
    fetchPets()
  }, [])

  return (
    <PetsContext.Provider value={{...state, openSidebar, closeSidebar, fetchSinglePet }}>
      {children}
    </PetsContext.Provider>
  )
}
// make sure use
export const usePetsContext = () => {
  return useContext(PetsContext)
}
