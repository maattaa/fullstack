const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', {
      username: 1,
      name: 1
    })
  response.json(blogs)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const users = await User.find({})
  //get first user from users
  const user = users.find(u => u !== undefined)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if (body.title === '' || body.url === '') {
    response.status(400)
      .json(body)
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201)
      .json(savedBlog)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(400).json(updatedBlog)
})

module.exports = blogsRouter