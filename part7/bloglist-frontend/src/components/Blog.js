import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { notificationSet, errorSet } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  //Wait till blog is loaded
  if (!blog) {
    return null
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

  return (
    < div className='blog' >
      <div>
        <h2>Blog app</h2>
        <h2>{blog.title} <i>by</i> {blog.author}</h2>
        <div id='url'>
          {/* Using //url to force url to be absolute */}
          <a href={`//${blog.url}`}>{blog.url}</a></div>
        <div id='likes'>
          likes {blog.likes} <button id='likeButton' onClick={() => dispatch(likeBlog(blog))}>like</button>
        </div>
        <div id='poster'>
          Added by {blog.user.name || user.name}
        </div>
        <div id='remove'>
          {removeButton()}
        </div>
        <h3>Comments</h3>
        <ul>
          {blog.comments.map(comment => 
            <li key={comment.id}>{comment.comment}</li>
          )}
        </ul>
      </div>
    </div >
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
  blogs: PropTypes.array,
  setBlogs: PropTypes.func,
  notifyWith: PropTypes.func,
  errorWith: PropTypes.func,
}

export default Blog
