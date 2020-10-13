const notificationAtStart = null

export const notificationSet = (notification, duration) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, duration*1000)
  }
}

const notificationReducer = (state = notificationAtStart, action) => {
  console.log('notification state now: ', state)
  console.log('notification action ', action)
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

export default notificationReducer