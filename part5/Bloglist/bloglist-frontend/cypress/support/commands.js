
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
    
    console.log('Response: ', body) // Log the response here
  })
  cy.visit('')
})


Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  console.log('Token: ', JSON.parse(localStorage.getItem('loggedBlogAppUser')).token)
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
    }
  })
  cy.visit('')
})