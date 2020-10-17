import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notificationSet, errorSet } from '../reducers/notificationReducer'
import { login } from '../reducers/userReducer'

const LoginForm = ({displayNotifications}) => {

  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => setUsername(event.target.value)

  const handlePasswordChange = (event) => setPassword(event.target.value)
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(login(username, password))
      dispatch(notificationSet(`Succesfully logged in as ${username}`, 5))
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      dispatch(errorSet('Wrong username or password!', 5))
    }
  }

  return (
    <div className='loginForm'>
      <h2>Log in to application</h2>
      {displayNotifications}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button
          type='submit'
          id='login-button'
        >login</button>
      </form>
    </div>
  )
}

export default LoginForm