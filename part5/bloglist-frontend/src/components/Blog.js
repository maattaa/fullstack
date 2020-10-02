import React, { useState } from 'react'
const Blog = ({ blog }) => {

  const [infoVisible, setInfoVisible] = useState(false)

  const blogStyle = {
    paddingTop: 6,
    paddingLeft: 6,
    paddingBottom: 6,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 6
  }

  const styleHideWhenVisible = {
    ...blogStyle,
    display: infoVisible ? 'none' : '',
  }
  const styleShowWhenVisible = {
    ...blogStyle,
    display: infoVisible ? '' : 'none',

  }

  return (
    <div>
      < div style={styleHideWhenVisible} >
        {blog.title} <button onClick={() => setInfoVisible(true)}>view</button>
      </div>
      <div style={styleShowWhenVisible}>

        <p>{blog.title} <button onClick={() => setInfoVisible(false)}>hide</button>
        <br></br>{blog.url}
        <br></br>likes {blog.likes} <button onClick={() => console.log('click!')}>like</button>
        <br></br>{blog.author}</p>

      </div>
    </div>
  )
}

export default Blog
