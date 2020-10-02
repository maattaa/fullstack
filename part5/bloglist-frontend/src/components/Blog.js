import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ 
  blog, 
  blogs, 
  setBlogs }) => {

  const [infoVisible, setInfoVisible] = useState(false)

  const blogStyle = {
    paddingTop: 6,
    paddingLeft: 6,
    paddingBottom: 6,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 6
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
        return ({...increasedBlog})
      }
      return blog
    })
    setBlogs(newBlogs)
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
          <br></br>{blog.author}</p>

      </div>
    </div>
  )
}

export default Blog
