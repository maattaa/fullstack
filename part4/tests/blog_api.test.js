const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Check that empty array returns nothing', async () => {
  const blogs = await api.get('/api/blogs')
  blogs.body.map(blog => {
    expect(blog.id).toBeDefined()
  })
})

describe('Posting...', () => {

  test('...works', async () => {
    const newBlog = {
      title: 'title',
      author: 'author',
      url: 'uniform resource locator',
      likes: 4
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogsAfterPost = await helper.blogsInDb()
    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1)

    const urls = blogsAfterPost.map(n => n.url)
    expect(urls).toContain(
      'uniform resource locator'
    )
  })

  test('...without likes, should default to 0', async () => {
    const newBlog = {
      'title': 'title',
      'author': 'author',
      'url': 'https://github.com/maattaa/fullstack/tree/master/part4'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogsAfterPost = await helper.blogsInDb()
    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1)
    const newestBlogs = await helper.newBlogsInDb()
    //Support to verify multiple blogs, although we are currently
    //sending a single object, not an array of objects
    newestBlogs.map(blog => {
      expect(blog.likes).toEqual(0)
    })
  })

  test('...without title, should fail', async () => {
    const blogTitless = {
      'title': '',
      'author': 'author',
      'url': 'https://github.com/maattaa/fullstack/tree/master/part4',
      'likes': 12
    }
    await api
      .post('/api/blogs')
      .send(blogTitless)
      .expect(400)
  })

  test('...without URL, should fail', async () => {
    const blogUrless = {
      'title': 'This shouldnt go through without url...',
      'author': 'author',
      'url': '',
      'likes': 15
    }

    await api
      .post('/api/blogs')
      .send(blogUrless)
      .expect(400)
  })
})
test('Delete a post', async () => {
  const blogToDelete = helper.initialBlogs[0]._id

  await api
    .delete(`/api/blogs/${blogToDelete}`)
    .expect(204)

  const newestBlogs = await helper.blogsInDb()
  expect(newestBlogs.length === helper.initialBlogs.length - blogToDelete.length)
})

test('Update blog likes', async () => {

  const initialBlogs = await helper.blogsInDb()
  const blogToUpdate = initialBlogs[0]

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(
      {
        likes: blogToUpdate.likes + 600
      }
    )
    .expect(400)

  const updatedBlogs = await helper.blogsInDb()

  const updatedBlog = updatedBlogs.filter(blog => {
    blog.id === blogToUpdate.id
  })

  expect(updatedBlog.likes !== blogToUpdate.likes)
})

afterAll(() => {
  mongoose.connection.close()
})
