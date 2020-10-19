import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useRouteMatch,
  Switch, Route, Link
} from 'react-router-dom'
import { notificationSet, errorSet } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { logout, lookForCookies } from './reducers/userReducer' 
import { initializeUsers} from './reducers/usersReducer'
import Blogs from './components/Blogs'
import { Notification, ErrorMessage } from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import BlogEntry from './components/BlogForm'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'

const App = () => {

  const user = useSelector(state => state.user)
  const state =  useSelector(state => state)
  const dispatch = useDispatch()

  //Get all blogs
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  //Get token if user is logged in
  useEffect(() => {
    dispatch(lookForCookies())
  }, [dispatch])


  //Get users, could be moved to Users-component
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])


  //Get user we want info for
  const match = useRouteMatch('/users/:id')
  const userInfo = match 
  ? state.users.find(u => u.id === match.params.id)
  : null

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(logout())
  }

/*   const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(notificationSet(`A new blog ${blogObject.title} added`, 5))
      dispatch(createBlog(blogObject))
    } catch (error) {
      dispatch(errorSet('Bad blog entry!', 5))
    }
  } */
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

/*   const blogFormRef = useRef()

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
  } */

  const padding = {
    padding: 5
  }

  if (user === null) {
    return loginForm()
  }

  return (
    <div>

        <div style={padding}>
        <p>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/users">Users</Link>
          {user.name} logged in
          <button id='logoutButton' onClick={() => handleLogOut()} >
            logout
          </button></p>
        </div>
        {displayNotifications()}
        <Switch>
        <Route path="/users/:id">
            <User user={userInfo} />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Blogs />
          </Route>
        </Switch>

    </div>
  )

}

export default App