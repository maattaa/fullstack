describe('Blog app', function () {

  const user = {
    username: 'root',
    password: 'hunter2',
    name: 'Test User'
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.register({user})
    cy.visit('http://localhost:3000')
  })

  // Make a test for checking that the application displays the login form by default.
  it('Login form is shown', function () {
    cy.get('.loginForm')
      .should('contain', 'Log in to application')
      .should('not.contain', 'logged in')
  })

  //Make tests for logging in. Test both successful and unsuccessful log in attempts.
  describe('Login', function() {
    //Succesfull
    it('Succeed with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('hunter2')
      cy.get('#login-button').click()

      cy.contains('Succesfully logged in as ')
    })
    //Unsuccessful
    it('Fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('WRONGPASS')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password!')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })
})