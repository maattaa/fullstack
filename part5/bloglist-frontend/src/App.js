import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import {Notification, ErrorMessage} from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  //  const [errorMessage, setErrorMessage] = useState()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

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
    //
    //Remove the bad practice password printing when no longer needed!
    //
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      errorWith('Wront username or password!')
      console.log('wrong creds!')
      //   setErrorMessage('Wrong credentials')
      //   setTimeout(() => {
      //     setErrorMessage(null)
      //   }, 5000)
    }
  }

  const handleLogOut = () => {

    window.localStorage.removeItem('loggedUser')

    setUser('')
    setUsername('')
    setPassword('')
    setBlogs([])
  }

  const handlePost = async (event) => {
    event.preventDefault()
    if (user) {
      try {
        const postedBlog = await blogService.create({
          title: blogTitle,
          author: blogAuthor,
          url: blogUrl
        })
        setBlogs(blogs.concat(postedBlog))
        notifyWith(`a new blog ${postedBlog.title} added`)
      }
      catch (exception) {
        console.log('Posting failed')
      }
    } else {
      errorWith('Log in first!')
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
    }
  }

  const LoginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorMessage message={errorMessage} />
        <Notification message={notification} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  if (user === null) {
    return (
      <>
        {LoginForm()}
      </>
    )
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        <ErrorMessage message={errorMessage} />
        <Notification message={notification} />
        <p>{user.name} logged in
      <button onClick={() => handleLogOut()} >
            logout
      </button></p>
        <br></br>
        <h2>Create new</h2>
        <form onSubmit={handlePost}>
          <div>
            title:
          <input
              type="text"
              value={blogTitle}
              name="Title"
              onChange={({ target }) => setBlogTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={blogAuthor}
              name="Author"
              onChange={({ target }) => setBlogAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={blogUrl}
              name="Url"
              onChange={({ target }) => setBlogUrl(target.value)}
            />
          </div>
          <div>
            <button type="submit">create</button>
          </div>
        </form>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App