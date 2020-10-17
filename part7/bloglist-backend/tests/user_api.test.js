const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('While having one user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('toor', 10)
    const user = new User({
      username: 'root',
      name: 'Root User',
      passwordHash
    })

    await user.save()
  })

  test('Creation of fresh users works', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'john',
      name: 'John Doe',
      password: 'hunter2'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('Creating duplicate users fails', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'toor',
      password: '123456'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error)
      .toContain(`User validation failed: username: Error, expected \`username\` to be unique. Value: \`${newUser.username}\``)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('Creating user with short username fails', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'as',
      name: 'Username is less than 3 chars',
      password: 'hunter2'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error)
      .toContain('Username is mandatory and needs to be atleast 3 characters long')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('Creating user with short password fails', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'admin',
      name: 'password is less than 3 chars',
      password: 'h2'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error)
      .toContain('Password is mandatory and needs to be atleast 3 characters long')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('Creating user with short username and password fails', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'adm',
      name: 'password and username is less than 3 chars',
      password: 'h2'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error)
      .toContain('is mandatory and needs to be atleast 3 characters long')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})