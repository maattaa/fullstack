import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogEntry = () => {

  const dispatch = useDispatch()

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleTitleChange = (event) => {
    setBlogTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setBlogAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setBlogUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogToBeCreated = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: 0
    }

    dispatch(createBlog(blogToBeCreated))

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

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
        <button type='submit' id='createButton'>create</button>
      </form>
    </div >
  )
}

export default BlogEntry