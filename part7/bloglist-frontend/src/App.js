import React, { useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import { Notification, ErrorMessage } from './components/Notification'
import BlogEntry from './components/BlogForm'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'

import { notificationSet, errorSet } from './reducers/notificationReducer'
import { createBlog } from './reducers/blogReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { logout } from './reducers/userReducer'

import { useDispatch, useSelector } from 'react-redux'
import { lookForCookies } from './reducers/userReducer'

const App = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  //Get all blogs
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  //Get token if user is logged in
  useEffect(() => {
    dispatch(lookForCookies())
  }, [dispatch])

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(logout())
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(notificationSet(`A new blog ${blogObject.title} added`, 5))
      dispatch(createBlog(blogObject))
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

  const loginForm = () => {
    return (
      <LoginForm
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