const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  if (body.title === '' || body.url === '') {
    response.status(400)
      .json(body)
  } else {
    const savedBlog = await blog.save()
    response.status(201)
      .json(savedBlog)
  }
})


module.exports = blogsRouter