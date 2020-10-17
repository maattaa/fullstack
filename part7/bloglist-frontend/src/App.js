import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import { Notification, ErrorMessage } from './components/Notification'
import BlogEntry from './components/BlogForm'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'

import {
  notificationSet, errorSet
} from './reducers/notificationReducer'
import { createBlog } from './reducers/blogReducer'

import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  //Get all blogs
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  //Get token if user is logged in
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
    dispatch(notificationSet(message, 5))
  }

  const errorWith = (message) => {
    dispatch(errorSet(message, 5))
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
      dispatch(notificationSet(`Succesfully logged in as ${user.name}`, 5))
      setUsername('')
      setPassword('')

    }
    catch (exception) {
      dispatch(errorSet('Wrong username or password!', 5))
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedUser')
    setUser('')
    setUsername('')
    setPassword('')
    setBlogs([])
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      // const createdBlog = await blogService.create(blogObject)
      dispatch(notificationSet(`A new blog ${blogObject.title} added`, 5))
      dispatch(createBlog(blogObject))
      // setBlogs(blogs.concat(createdBlog))
    } catch (error) {
      dispatch(errorSet('Bad blog entry!', 5))
    }
  }
  const displayNotifications = () => {

    return (
      <>
        <ErrorMessage />
        <Notification />
      </>
    )
  }

  const increaseLikes = async (blog) => {
    const increasedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const response = await blogService.update(increasedBlog)
    const newBlogs = blogs.map((blog) => {
      if (blog.id === response.id) {
        return ({ ...increasedBlog })
      }
      return blog
    })
    setBlogs(newBlogs)
  }

  const loginForm = () => {
    return (
      <LoginForm
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
          <button id='logoutButton' onClick={() => handleLogOut()} >
            logout
          </button></p>
        <br></br>
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
          <BlogEntry createBlog={addBlog} />
        </Togglable >
        <br></br>
        <Blogs
          setBlogs={setBlogs}
          notifyWith={notifyWith}
          errorWith={errorWith}
          increaseLikes={increaseLikes}
          user={user}
        />
      </div>
    )
  }

  return (
    <div>
      { user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )

}

export default App