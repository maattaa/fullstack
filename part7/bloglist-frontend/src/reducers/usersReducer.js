import userService from '../services/users'

const usersAtStart = []

const userReducer = (state = usersAtStart, action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    case 'GET_USER':
      return state.find(u => u.id === action.id)
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

/* export const getUser = (id) => {
  const user = dispatch({
    type: 'GET_USER',
    id: id
  })
  return user
} */

export default userReducer