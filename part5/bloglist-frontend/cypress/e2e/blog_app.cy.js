describe('Blog app', function() {
  beforeEach(function() {
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
})