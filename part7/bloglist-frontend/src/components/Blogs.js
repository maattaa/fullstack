import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogEntry from './BlogForm'
import { Table } from 'react-bootstrap'

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
    <div className="container">
      <h2>Blogs</h2>
      <BlogEntry />
      <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Likes</th>
          </tr>
        </thead>


        <tbody>

          {sortedBlogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
              <td>
                {blog.author}
              </td>
              <td>
                {blog.likes}
              </td>
            </tr>
          )}

        </tbody>
      </Table>
    </div>
  )
}

export default Blogs