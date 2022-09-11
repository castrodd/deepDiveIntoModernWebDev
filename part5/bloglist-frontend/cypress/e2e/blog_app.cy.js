describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Dwyane Wade',
      username: 'dwyanewade',
      password: 'theflash'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page opens', function() {
    cy.contains('Blogs')
    cy.contains('Created by ddc')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()  
    cy.get('#username').type('dwyanewade')
    cy.get('#password').type('theflash')
    cy.get('#submit').click()
    cy.contains('Logged in as dwyanewade')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()  
      cy.get('#username').type('dwyanewade')
      cy.get('#password').type('theflash')
      cy.get('#submit').click()
    })

    it('a new blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#author').type('Cypress Hill')
      cy.get('#title').type('Automated Testing')
      cy.get('#url').type('www.cypress.test')
      cy.get('#submit-blog').click()
      cy.contains('Automated Testing')
    })
  })
})