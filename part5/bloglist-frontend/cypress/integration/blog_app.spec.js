describe('Blog app', function () {

  const user = {
    username: 'root',
    password: 'hunter2',
    name: 'Test User'
  }

  const blog = {
    title: 'TESTING TITLE',
    author: 'Blog Author',
    url: 'www.VERYOBFUSCATEDURL.net'
  }
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.register({user})
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('.loginForm')
      .should('contain', 'Log in to application')
      .should('not.contain', 'logged in')
  })

  describe('Login...', function() {

    it('...Succeed with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('hunter2')
      cy.get('#login-button').click()

      cy.contains('Succesfully logged in as ')
    })

    it('...Fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('WRONGPASS')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password!')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in...', function() {
    beforeEach(function() {
      cy.login(user)
      cy.visit('http://localhost:3000')
    })

    it('...New Blog button is visible', function() {
      cy.contains('New Blog')
    })

    it('...Blog can be added and is visible afterwards', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#createButton').click()
      cy.contains(`${blog.title} by ${blog.author}`)
    })

    it('...Blogs can be liked', function() {
      cy.addBlogForm({
        title: blog.title,
        author: blog.author,
        url: blog.url
      })
      cy.contains(`${blog.title} by ${blog.author}`)
      .get('#viewButton')
      .click()
      .get('#likeButton').as('likeButton')
      .click()
      cy.contains('likes 1')
      cy.get('@likeButton')
      .click()
      cy.contains('likes 2')
    })
  })
})