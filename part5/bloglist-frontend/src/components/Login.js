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
    <div>
      <h2>Log in to application</h2>
      {displayNotifications}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm