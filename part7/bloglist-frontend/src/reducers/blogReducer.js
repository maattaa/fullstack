import blogService from '../services/blogs'

const blogsAtStart = []

const blogReducer = (state = blogsAtStart, action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      const blogsWithoutLiked = state.filter(blog => blog.id !== action.data.id)
      return blogsWithoutLiked.concat(action.data)
    case 'DELETE_BLOG':
      const blogsWithoutDeleted = state.filter(blog => blog.id !== action.data.id)
      return state = blogsWithoutDeleted
    case 'COMMENT_BLOG':

      const blogs = state.map(blog =>
        blog.id !== action.data.blogid
          ? blog
          : {
            ...blog,
            comments: blog.comments.concat(
              {
                comment: action.data.comment,
                id: action.data.commentId
              }
            )
          }
      )
      return blogs
    default:
      return state
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const updatedBlog = await blogService.update(likedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: { ...updatedBlog }
    })
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.del(blog.id)
    dispatch({
      type: 'DELETE_BLOG',
      data: {
        id: blog.id
      }
    })
  }
}

export const addComment = blog => {
  return async dispatch => {
    const request = await blogService.addComment(blog)
    dispatch({
      type: 'COMMENT_BLOG',
      data: {
        comment: request.data.comment,
        commentId: request.data.id,
        blogid: blog.id
      }
    })
  }
}

export default blogReducer