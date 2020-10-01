import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { Notification, ErrorMessage } from './components/Notification'
import BlogEntry from './components/BlogForm'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const notifyWith = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const errorWith = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      notifyWith(`Succesfully logged in as ${user.name}`)
      setUsername('')
      setPassword('')

    }
    catch (exception) {
      errorWith('Wrong username or password!')
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedUser')
    setUser('')
    setUsername('')
    setPassword('')
    setBlogs([])
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
    notifyWith(`A new blog ${blogObject.title} added`)
  }

  const displayNotifications = () => {
    return (
      <>
        <ErrorMessage message={errorMessage} />
        <Notification message={notification} />
      </>
    )
  }

  const loginForm = () => {
    return (
      < LoginForm
        handleLogin={handleLogin}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        username={username}
        password={password}
        displayNotifications={displayNotifications()}
      />
    )
  }

  const blogFormRef = useRef()

  const blogForm = () => {
    return (
      <div>
        <h2>Blogs</h2>
        {displayNotifications()}
        <p>{user.name} logged in
         <button onClick={() => handleLogOut()} >
            logout
         </button></p>
        <br></br>
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
          <BlogEntry createBlog={addBlog} />
        </Togglable >
        {
          blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )
        }
      </div>
    )
  }


  if (user === null) {
    return (
      <>
        {loginForm()}
      </>
    )
  } else {
    return (
      <>
        {blogForm()}
      </>
    )
  }
}

export default App