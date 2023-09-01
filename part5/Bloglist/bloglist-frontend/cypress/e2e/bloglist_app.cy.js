describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST',`${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Gimli son of Gloin',
      username: 'Gimli',
      password: 'MyAxe123'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Gimli')
      cy.get('#password').type('MyAxe123')
      cy.get('#login-button').click()
      
      cy.contains('Gimli son of Gloin logged in')


      
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Sauron')
      cy.get('#password').type('Ring123')
      cy.get('#login-button').click()

      cy.get('.error')
      .should('contain', 'wrong credentials')
      cy.get('html').should('not.contain', 'The Dark Lord Sauron logged in')
    })
  })
})