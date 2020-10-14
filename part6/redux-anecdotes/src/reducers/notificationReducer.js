const notificationAtStart = null
let timeoutID = null

const notificationReducer = (state = notificationAtStart, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      return action.notification
    }
    case 'CLEAR_NOTIFICATION': {
      return null
    }
    default:
      return state
  }
}

export const notificationSet = (notification, duration) => {
  return async dispatch => {
    if (timeoutID) {
      clearTimeout(timeoutID)
      timeoutID = null
    }

    timeoutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, duration * 1000)

    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
      timeoutID
    })
  }
}

export default notificationReducer