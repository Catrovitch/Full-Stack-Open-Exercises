/* eslint-disable indent */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST',`${Cypress.env('BACKEND')}/testing/reset`)
    const user1 = {
      name: 'Gimli son of Gloin',
      username: 'Gimli',
      password: 'MyAxe123'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1)
    const user2 = {
      name: 'Gandalf the Grey',
      username: 'Gandalf',
      password: 'Pipeweed123'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
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
        cy.contains('Test Blog').parent().as('blogPost')
        cy.get('@blogPost').get('#showButton').click()
        cy.get('@blogPost').get('#likeButton').click()  
        cy.get('@blogPost').get('#likes').contains('Likes: 1')
      })

      it('User can delete a blog he/she created', function () {
        cy.contains('Test Blog').parent().as('blogPost')
        cy.get('@blogPost').get('#deleteButton').click()
        cy.get('html').should('not.contain', "Title & Author: Test Blog - Testing Blogson")
      })

      it.only('Delete button only visible to correct users', function() {
        cy.contains('Test Blog').parent().as('blogPost')
        cy.get('@blogPost').get('#deleteButton')
        cy.get('#LogoutButton').click()
        cy.get('html').should('not.contain', 'delete') 
      })
    })
  })
})
