import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs = ({
  setBlogs,
  notifyWith,
  errorWith,
  increaseLikes,
  user
}) => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div className='blogs'>
      {sortedBlogs.map(blog => 
      
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          notifyWith={notifyWith}
          errorWith={errorWith}
          increaseLikes={increaseLikes}
          user={user} />
      )}
    </div>
  )
}

export default Blogs