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

test('Posting works', async () => {
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

test('Posting without likes', async () => {
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
  //sending a single object, not an array
  newestBlogs.map(blog => {
    expect(blog.likes).toEqual(0)
  })
})

test('Posting without title', async () => {
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

test('Posting without URL', async () => {
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

afterAll(() => {
  mongoose.connection.close()
})
