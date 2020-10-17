const notificationAtStart = {
  notification: '',
  error: ''
}
let notificationTimeoutID = null
let errorTimeoutID = null


const notificationReducer = (state = notificationAtStart, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        notification: action.notification,
        error: state.error
      }
    case 'CLEAR_NOTIFICATION':
      return {
        notification: '',
        error: state.error
      }
    case 'SET_ERROR':
      return {
        notification: state.notification,
        error: action.error
      }
    case 'CLEAR_ERROR':
      return {
        notification: state.notification,
        error: ''
      }
    default:
      return state
  }
}

export const notificationSet = (notification, duration) => {
  return async dispatch => {
    if (notificationTimeoutID) {
      clearTimeout(notificationTimeoutID)
      notificationTimeoutID = null
    }
    notificationTimeoutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, duration * 1000)

    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    })
  }
}

export const errorSet = (error, duration) => {
  return async dispatch => {
    if (errorTimeoutID) {
      clearTimeout(errorTimeoutID)
      errorTimeoutID = null
    }
    errorTimeoutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR_ERROR'
      })
    }, duration * 1000)

    dispatch({
      type: 'SET_ERROR',
      error
    })
  }
}

export default notificationReducer