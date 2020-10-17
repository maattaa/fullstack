import React from 'react'
import { useSelector } from 'react-redux'

const errorStyle = ({
  color: 'red',
  background: 'darkgrey',
  fontSize: 25,
  fontWeight: 'bold',
  textAlign: 'center',
  padding: 30,
  borderStyle: 'solid',
  borderRadius: 10,
  marginBottom: 40
})

const notificationStyle = ({
  color: 'green',
  background: 'lightgrey',
  fontSize: 25,
  fontWeight: 'bold',
  textAlign: 'center',
  padding: 30,
  borderStyle: 'solid',
  borderRadius: 10,
  marginBottom: 40
})

const Notification = () => {
  const message = useSelector(state => state.notifications.notification)

  if (!message) {
    return null
  }

  return (
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  )
}

const ErrorMessage = () => {
  const message = useSelector(state => state.notifications.error)
  if (!message) {
    return null
  }

  return (
    <div className="error" style={errorStyle}>
      {message}
    </div>
  )
}

export { Notification, ErrorMessage }