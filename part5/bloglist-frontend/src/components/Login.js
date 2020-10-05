import React from 'react'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  displayNotifications
}) => {

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