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
    cy.register({ user })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('.loginForm')
      .should('contain', 'Log in to application')
      .should('not.contain', 'logged in')
  })

  describe('Login...', function () {
    it('Succeed with correct credentials', function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()

      cy.contains('Succesfully logged in as ')
    })

    it('Fails with wrong credentials', function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type('WRONGPASS!')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password!')
      cy.get('.error')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in...', function () {
    beforeEach(function () {
      cy.login(user)
      cy.visit('http://localhost:3000')
    })

    it('New Blog button is visible', function () {
      cy.contains('New Blog')
    })

    it('Blog can be added and is visible afterwards', function () {
      cy.contains('New Blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#createButton').click()
      cy.contains(`${blog.title} by ${blog.author}`)
    })

    it('Blogs can be liked', function () {
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

    it('Blogs can be deleted by author', function () {
      cy.addBlogForm({
        title: blog.title,
        author: blog.author,
        url: blog.url
      })
      cy.contains(`${blog.title} by ${blog.author}`)
        .get('#viewButton')
        .click()
        .get('#removeButton')
        .click()
      cy.contains(`Deleted ${blog.title}`)
    })

    it('Blogs CAN NOT bet deleted by other than author', function () {
      cy.addBlogForm({
        title: blog.title,
        author: blog.author,
        url: blog.url
      })
      cy.get('#logoutButton').click()
      cy.register({
        user: {
          username: 'testuser',
          password: 'secret',
          name: 'unauthorized'
        }
      })
      cy.visit('http://localhost:3000')
      cy.login({
        username: 'testuser',
        password: 'secret'
      })
      cy.contains(`${blog.title} by ${blog.author}`)
        .get('#viewButton')
        .click()
        .should('not.contain', '#removeButton')
    })

    it('Blogs are sorted by likes', function () {
      const blog1 = {
        title: 'blog1title',
        author: 'blog1author',
        url: 'www.blog1url.com'
      }

      const blog2 = {
        title: 'blog2title',
        author: 'blog2author',
        url: 'www.blog2url.com'
      }

      cy.addBlogForm(blog1)
      cy.addBlogForm(blog2)
      //wait till blog shows up
      cy.wait(200)

      cy.contains(`${blog1.title} by ${blog1.author}`)
        .contains('view').click()
      cy.contains(`${blog2.title} by ${blog2.author}`)
        .contains('view').click()

      //make blog1 top with one like
      cy.get('.blogs').children()
        .eq(0)
        .get('#likeButton').click()
      cy.wait(100)

        //like blog2 twice, has likes 0 currently
      cy.get('.blogs').children()
        .contains('likes 0')
        //like blog2 twice
        .contains('like').click().click()
      cy.wait(100)

      cy.get('.blogs').children()
      //blog2 tops
        .eq(0)
        .should('contain', blog2.url)
        .and('contain', 'likes 2')

      cy.get('.blogs').children()
      //blog1 is below it having only 1 like
        .eq(1)
        .should('contain', blog1.url)
        .and('contain', 'likes 1')
    })
  })
})
