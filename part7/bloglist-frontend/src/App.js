import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useRouteMatch,
  Switch, Route, Link
} from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { logout, lookForCookies } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import { Notification, ErrorMessage } from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import LoginForm from './components/Login'

import { Nav, Navbar, Button } from 'react-bootstrap'

const App = () => {

  const user = useSelector(state => state.user)
  const state = useSelector(state => state)
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
  const matchUser = useRouteMatch('/users/:id')
  const userInfo = matchUser
    ? state.users.find(u => u.id === matchUser.params.id)
    : null

  //Get blog we want info for
  const matchBlog = useRouteMatch('/blogs/:id')
  const blogInfo = matchBlog
    ? state.blogs.find(b => b.id === matchBlog.params.id)
    : null

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(logout())
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

  const padding = {
    padding: 5
  }

  if (user === null) {
    return loginForm()
  }

  return (
    <div>

      <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav classname="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">Blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">Users</Link>
            </Nav.Link>
            </Nav>
            <Nav className="ml-auto">
            <Nav.Link href="#" as="span">
              <em style={padding}>{user.name} logged in</em>
            </Nav.Link>
            <Button onClick={() => handleLogOut()}>Log out</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>



      {displayNotifications()}
      <Switch>
        <Route path="/users/:id">
          <User user={userInfo} />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={blogInfo} />
        </Route>
        <Route path="/">
          <Blogs />
        </Route>
      </Switch>

    </div>
  )

}

export default App