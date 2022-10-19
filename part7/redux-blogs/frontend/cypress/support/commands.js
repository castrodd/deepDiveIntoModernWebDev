// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', ({username, password}) => {
  cy.request('POST', 'http://localhost:3003/api/login/', {
    username, password
  }).then(response => {
    localStorage.setItem('user', JSON.stringify(response.body))
    cy.visit('http://localhost:3000')      
  })
})

Cypress.Commands.add('createBlog', ({author, title, url}) => {
  cy.contains('create new blog').click()
  cy.get('#author').type(author)
  cy.get('#title').type(title)
  cy.get('#url').type(url)
  cy.get('#submit-blog').click()
})

Cypress.Commands.add('likeButton', ({title}) => {
  cy.get('.blog').contains(title)
  .contains('view')
  .click()
  .get('#like-button')
})
