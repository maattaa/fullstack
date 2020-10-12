const filterAtStart = ''

export const filterSet = (filter) => {
  console.log('filter', filter)
  return {
    type: 'SET_FILTER',
    filter
  }
}

const filterReducer = (state = filterAtStart, action) => {
  console.log('filter state now: ', state)
  console.log('filter action ', action)
  switch (action.type) {
    case 'SET_FILTER': {
      return action.filter
    }
    default:
      return filterAtStart
  }
}

export default filterReducer