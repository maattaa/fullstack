import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'GET_USER':
      return state
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const login = (username, password) => {
  return async dispatch => {
    const loggedUser = await loginService.login({
      username,
      password
    })
    blogService.setToken(loggedUser.token)
    window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
    dispatch({
      type: 'SET_USER',
      data: loggedUser
    })
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const lookForCookies = () => {
  return dispatch => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: user
      })
    }
  }
}

export default userReducer