const notificationAtStart = null

export const notificationSet = (notification) => {
  console.log(notification)
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

export const notificationClear = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
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
      return notificationAtStart
  }
}

export default notificationReducer