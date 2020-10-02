import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({
  blog,
  blogs,
  setBlogs,
  notifyWith,
  errorWith,
  user
}) => {

  const [infoVisible, setInfoVisible] = useState(false)

  //Used for all blogs
  const blogStyle = {
    paddingTop: 6,
    paddingLeft: 6,
    paddingBottom: 6,
    border: 'solid',
    borderWidth: 3,
    marginBottom: 6,
    borderRadius: 10
  }

  const styleHideWhenVisible = {
    ...blogStyle,
    display: infoVisible ? 'none' : '',
  }
  const styleShowWhenVisible = {
    ...blogStyle,
    display: infoVisible ? '' : 'none',

  }

  const increaseLikes = async (blog) => {
    const increasedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const response = await blogService.update(blog.id, increasedBlog)
    const newBlogs = blogs.map((blog) => {
      if (blog.id === response.id) {
        return ({ ...increasedBlog })
      }
      return blog
    })
    setBlogs(newBlogs)
  }

  const removeButton = () => {
    //blog.user.id is on initially fetched blogs as these have user populated
    //blog.user is needed for the ones the user creates without refreshing page
    const userAsAuthor = (blog.user.id === user.id || blog.user === user.id)
    if (userAsAuthor) {
      return(
        <button onClick={() => deleteBlog(blog)}>remove</button>
      )
    }
    return
  }

  const deleteBlog = async (blogObject) => {
    const ok = window.confirm(`Remove ${blogObject.title} by ${blogObject.author}`)
    if (ok) {
      try {
        await blogService.del(blogObject.id)
        const newBlogs = blogs.filter((blog) => {
          if (blog.id !== blogObject.id) {
            return blog
          } else {
            return null
          }
        })
        setBlogs(newBlogs)
        notifyWith(`Deleted ${blogObject.title}`)
      } catch {
        errorWith(`Unable to delete ${blogObject.title}`)
      }
    }
    return null
  }

  return (
    <div>
      < div style={styleHideWhenVisible} >
        {blog.title} <button onClick={() => setInfoVisible(true)}>view</button>
      </div>
      <div style={styleShowWhenVisible}>

        <p>{blog.title} <button onClick={() => setInfoVisible(false)}>hide</button>
          <br></br>{blog.url}
          <br></br>likes {blog.likes} <button onClick={() => increaseLikes(blog)}>like</button>
          <br></br>{blog.author}
          <br></br>
          {removeButton()}
          </p>
      </div>
    </div>
  )
}

export default Blog
