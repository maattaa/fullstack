import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer'
import { notificationSet, errorSet } from '../reducers/notificationReducer'

import { useHistory } from 'react-router-dom'

import {List, ListGroup} from 'react-bootstrap'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const history = useHistory()
  const [comment, setComment] = useState('')

  //Wait till blog is loaded
  if (!blog) {
    return null
  }

  const handleCommentChange = (event) => setComment(event.target.value)

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
        history.push('/')
      } catch {
        dispatch(errorSet(`Unable to delete ${blogObject.title}`, 5))
      }
    }
    return null
  }

  const addCommentSubmit = (event) => {
    event.preventDefault()
    const blogObject = {
      id: blog.id,
      comments: {
        comment: comment
      }
    }

    try {
      dispatch(addComment(blogObject))
      dispatch(notificationSet(`A new comment added`, 5))
      setComment('')
    } catch (error) {
      dispatch(errorSet(`Got error ${error}`))
    }

  }

  const commentForm = () => {
    return (
      <div>
        <form onSubmit={addCommentSubmit}>
          <input
            id='comment'
            type='text'
            value={comment}
            name='Comment'
            onChange={handleCommentChange}>
          </input>
          <button type='submit' id='addComment'>Create comment</button>
        </form>
      </div>
    )
  }

  return (
    < div className='container' >
      <div>
        <h2>Blog app</h2>
        <h3>{blog.title} <i>by</i> {blog.author}</h3>
        <div>
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
          <br></br>
        </div>
        <div>
          <h3>Comments</h3>
          {commentForm()}
          <ListGroup>
            {blog.comments.map(c =>
              <ListGroup.Item key={c.id}>{c.comment}</ListGroup.Item>
            )}
          </ListGroup>
        </div>
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
