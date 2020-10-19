import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { notificationSet, errorSet } from '../reducers/notificationReducer'

const BlogEntry = () => {

  const dispatch = useDispatch()

  const [visibility, setVisibility] = useState(false)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleTitleChange = (event) => setBlogTitle(event.target.value)
  const handleAuthorChange = (event) => setBlogAuthor(event.target.value)
  const handleUrlChange = (event) => setBlogUrl(event.target.value)

  const addBlog = (event) => {
    event.preventDefault()
    setVisibility(!visibility)
    const blogToBeCreated = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: 0
    }
    try {
      dispatch(createBlog(blogToBeCreated))
      dispatch(notificationSet(`A new blog ${blogToBeCreated.title} added`, 5))
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
    } catch (error) {
      dispatch(errorSet('Bad blog entry!', 5))
    }
  }

  const entryButton = () => {
    if (!visibility) {
      return (
        <div>
          <button onClick={() => setVisibility(!visibility)}>New Blog</button>
        </div>
      )
    } else {
      return (
        <div>
          {blogForm()}
          <button onClick={() => setVisibility(!visibility)}>Cancel</button>
        </div>
      )
    }
  }

  const blogForm = () => {
    return (
      <div className='blogFormDiv'>
        <h2>Create a new blog</h2>
        <form onSubmit={addBlog} id='blogEntryForm'>
          <div>
            title:
          <input
              id='title'
              type='text'
              value={blogTitle}
              name='Title'
              onChange={handleTitleChange}
            />
          </div>
          <div>
            author:
          <input
              id='author'
              type='text'
              value={blogAuthor}
              name='Author'
              onChange={handleAuthorChange}
            />
          </div>
          <div>
            url:
          <input
              id='url'
              type='text'
              value={blogUrl}
              name='Url'
              onChange={handleUrlChange}
            />
          </div>
          <br></br>
          <button type='submit' id='createButton'>Create</button>
        </form>
      </div >
    )
  }

  return (
    <div>
      {entryButton()}
    </div>
  )
}

export default BlogEntry