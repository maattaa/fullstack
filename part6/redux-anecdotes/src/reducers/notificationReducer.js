const notificationAtStart = 'moi'


export const notificationSet = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

const notificationReducer = (state = notificationAtStart, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      return {...state, notification: action.data}
    }
    default:
      return notificationAtStart
  }
}

export default notificationReducer