import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({
  blog,
  blogs,
  setBlogs,
  notifyWith,
  errorWith,
  increaseLikes,
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

  const removeButton = () => {
    //blog.user.id is on initially fetched blogs as these have user populated
    //blog.user is needed for the ones the user creates without refreshing page
    const userAsAuthor = (blog.user.id === user.id || blog.user === user.id)
    if (userAsAuthor) {
      return (
        <button id='removeButton' onClick={() => deleteBlog(blog)}>remove</button>
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

  if (blogs.length === 0) {
    return
  } else {
    return (
      < div className='blog' >
        < div style={styleHideWhenVisible} >
          <div id='titleHidden'>
            {blog.title} <i>by</i> {blog.author}<button id='viewButton' onClick={() => setInfoVisible(true)}>view</button>
          </div>
        </div>
        <div style={styleShowWhenVisible}>
          <div id='titleVisible'>
            {blog.title} <i>by</i> {blog.author}<button id='hideButton' onClick={() => setInfoVisible(false)}>hide</button>
          </div>
          <div id='url'>
            {blog.url}</div>
          <div id='likes'>
            likes {blog.likes} <button id='likeButton' onClick={() => increaseLikes(blog)}>like</button>
          </div>
          {/*Either get the blog.user.name after populating it in the backend,
          or use the current logged in users name as these are present on newly created blogs by user.
          Currently user is added to blogs when the blog is created with user.id,
          and no other way to get users name without doing more backend queries.
          This could backfire, but good for now*/}
          <div id='poster'>
            {blog.user.name || user.name}
          </div>
          <div id='remove'>
            {removeButton()}
          </div>
        </div>
      </div >
    )
  }
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array,
  setBlogs: PropTypes.func,
  notifyWith: PropTypes.func,
  errorWith: PropTypes.func,
  user: PropTypes.object.isRequired
}

export default Blog
