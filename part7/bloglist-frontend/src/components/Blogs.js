import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogEntry from './BlogForm'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

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

  return (
    <div>
      <h2>Blogs</h2>
      <BlogEntry />
      <br></br>
      <div className='blogs'>
        {sortedBlogs.map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} <i>by</i> {blog.author}
          </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blogs