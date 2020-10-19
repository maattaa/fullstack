import React from 'react'
import { useSelector } from 'react-redux'
import {Alert} from 'react-bootstrap'

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
    <Alert variant="success">
      {message}
    </Alert>
  )
}

const ErrorMessage = () => {
  const message = useSelector(state => state.notifications.error)
  if (!message) {
    return null
  }

  return (
    <Alert variant="danger">
      {message}
    </Alert>
  )
}

export { Notification, ErrorMessage }