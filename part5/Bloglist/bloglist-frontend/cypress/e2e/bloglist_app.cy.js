/* eslint-disable indent */
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
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('Gimli')
      cy.get('#password').type('MyAxe123')
      cy.get('#login-button').click()
    })
    it('A blog can be created', function() {
      cy.contains('new Blog').click()
      cy.get('#Title').type('Test Blog')
      cy.get('#Author').type('Testing Blogson')
      cy.get('#URL').type('testblog.com')
      cy.get('#createButton').click()
      cy.contains('Title & Author: Test Blog - Testing Blogson')
    })
    describe('User can like a blog', function() {
      beforeEach(function() {
        cy.contains('new Blog').click()
        cy.get('#Title').type('Test Blog')
        cy.get('#Author').type('Testing Blogson')
        cy.get('#URL').type('testblog.com')
        cy.get('#createButton').click()
      })

      it('User can like a blog', function () {
        // Find the blog post by its title
        cy.contains('Test Blog').parent().as('blogPost')
      
        // Click the "Show" button to view the full blog post
        cy.get('@blogPost').get('#showButton').click()
      
        // Click the "Like" button to like the blog post
        cy.get('@blogPost').get('#likeButton').click()
      
        // Verify that the "Likes" count has increased to 1
        cy.get('@blogPost').get('#likes').contains('Likes: 1')
      })
    })
  })
})
