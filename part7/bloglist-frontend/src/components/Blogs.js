import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import BlogEntry from './BlogForm'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>Blogs</h2>
        <BlogEntry />
      <br></br>
      <div className='blogs'>
        {sortedBlogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog} />
        )}
      </div>
    </div>
  )
}

export default Blogs