import {
  LOAD_PETS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PETS,
  UPDATE_FILTERS,
  FILTER_PETS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if(action.type === LOAD_PETS) {
    let maxPrice = action.payload.map((product) => product.price)

    maxPrice = Math.max(...maxPrice)

    return {...state, all_pets:[...action.payload], filtered_pets:[...action.payload], filters: {...state.filters, max_price: maxPrice, price: maxPrice}}
  }

  if(action.type === SET_GRIDVIEW) {
    return {...state, grid_view: true}
  }

  if(action.type === SET_LISTVIEW) {
    return {...state, grid_view: false}
  }

  if(action.type === UPDATE_SORT) {
    return {...state, sort: action.payload}
  }

  if(action.type === SORT_PETS) {
    const {sort, filtered_pets} = state
    let tempPets = [...filtered_pets]

    if(sort === 'price-lowest') {
      tempPets = tempPets.sort((a, b) => a.price - b.price)
    }

    if(sort === 'price-highest') {
      tempPets = tempPets.sort((a, b) => b.price - a.price)
    }

    if(sort === 'name-a') {
      tempPets = tempPets.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }

    if(sort === 'name-z') {
       tempPets = tempPets.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }

    return {...state, filtered_pets: tempPets }
  }

  if(action.type === UPDATE_FILTERS) {
    const {name, value} = action.payload

    return {...state, filters: {...state.filters, [name]: value}}
  }

  if(action.type === FILTER_PETS) {
    const {all_pets} = state
    const {text, category, company, color, price, shipping} = state.filters
    let tempPets = [...all_pets]

    if(text) {
      tempPets = tempPets.filter((product) => {
        return product.name.toLowerCase().startsWith(text)
      })
    }

    if(category !== 'all') {
      tempPets = tempPets.filter((product) => product.category === category)
    }

    if(company !== 'all') {
      tempPets = tempPets.filter((product) => product.company === company)
    }

    if(color !== 'all') {
      tempPets = tempPets.filter((product) => {
        return product.colors.find((c) => c === color)
      })
    }

    if(price) {
      tempPets = tempPets.filter((product) => product.price <= price)
    }

    if(shipping) {
      tempPets = tempPets.filter((product) => product.shipping === true)
    }

    return {...state, filtered_pets: tempPets}
  }

  if(action.type === CLEAR_FILTERS) {
    return {...state, filters: {
    ...state.filters,
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    price: state.filters.max_price,
    shipping: false
  }}
  }


  
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
