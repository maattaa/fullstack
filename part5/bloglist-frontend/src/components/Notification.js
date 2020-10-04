import React from 'react'

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

const Notification = ({ message }) => {

  if (!message) {
    return null
  }

  return (
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  )
}

const ErrorMessage = ({ message }) => {
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