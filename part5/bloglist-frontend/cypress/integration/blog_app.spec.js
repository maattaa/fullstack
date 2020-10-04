describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  // Make a test for checking that the application displays the login form by default.
  it('Login form is shown', function() {
   cy.get('.loginForm')
    .contains('Log in to application')
  })
})