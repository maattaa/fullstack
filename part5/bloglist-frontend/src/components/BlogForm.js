import React, { useState } from 'react'

const BlogEntry = ({ createBlog }) => {
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
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"

            value={blogTitle}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={blogUrl}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div >
  )
}

export default BlogEntry