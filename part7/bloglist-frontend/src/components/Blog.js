import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { notificationSet, errorSet } from '../reducers/notificationReducer'

const Blog = ({blog,}) => {

  const dispatch = useDispatch()
  const [infoVisible, setInfoVisible] = useState(false)
  const user = useSelector(state => state.user)

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
        <button id='removeButton' onClick={() => del(blog)}>remove</button>
      )
    }
    return
  }

  const del = async (blogObject) => {
    const ok = window.confirm(`Remove ${blogObject.title} by ${blogObject.author}`)
    if (ok) {
      try {
        dispatch(deleteBlog(blogObject))
        dispatch(notificationSet(`Deleted ${blogObject.title}`, 5))
      } catch {
        dispatch(errorSet(`Unable to delete ${blogObject.title}`, 5))
      }
    }
    return null
  }

  if (!blog) {
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
            likes {blog.likes} <button id='likeButton' onClick={() => dispatch(likeBlog(blog))}>like</button>
          </div>
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
}

export default Blog
