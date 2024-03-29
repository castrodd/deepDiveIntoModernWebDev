describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Dwyane Wade',
      username: 'dwyanewade',
      password: 'theflash'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page opens', function () {
    cy.contains('Blogs')
    cy.contains('Created by ddc')
  })

  it('login form can be opened', function () {
    cy.contains('login').click()
    cy.get('#username').type('dwyanewade')
    cy.get('#password').type('theflash')
    cy.get('#submit').click()
    cy.contains('Logged in as dwyanewade')
  })

  it('login fails with wrong password', function () {
    cy.contains('login').click()
    cy.get('#username').type('dwyanewade')
    cy.get('#password').type('thediesel')
    cy.get('#submit').click()
    cy.contains('Wrong credentials!')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'dwyanewade', password: 'theflash' })
      cy.createBlog({
        author: 'Cypress Hill',
        title: 'Automated Testing',
        url: 'www.cypress.test'
      })
    })

    it('a new blog can be created', function () {
      cy.contains('Automated Testing')
    })

    it('a user can like a blog', function () {
      cy.contains('view').click()
      cy.get('#like-button').click()
      cy.contains('Likes: 1')
    })

    it('a user can delete a blog', function () {
      cy.contains('view').click()
      cy.get('#remove-button').click()
      cy.contains('Automate Testing').should('not.exist')
    })

    it('wrong user cannot delete', () => {
      const user = {
        name: 'Shaq',
        username: 'shaqattack',
        password: 'thediesel'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)

      cy.contains('logout').click()
      cy.login({ username: 'shaqattack', password: 'thediesel' })

      cy.contains('view').click()
      cy.get('#remove-button').click()
      cy.contains('Automated Testing')
    })

    it('blogs ordered by likes', function () {
      cy.createBlog({
        author: 'Cypress Hill',
        title: 'The Sequel',
        url: 'www.cy.two'
      })

      cy.createBlog({
        author: 'Cypress Hill',
        title: 'The Finale',
        url: 'www.cy.three'
      })

      cy.likeButton({title: 'Automated Testing'}).click()
      cy.get('#hide-button').click()

      cy.likeButton({title: 'The Sequel'})
        .click()
        .click()
      cy.get('#hide-button').click()

      cy.likeButton({title: 'The Finale'})
        .click()
        .click()
      cy.get('#hide-button').click()

      cy.likeButton({title: 'The Finale'}).click()
      cy.get('#hide-button').click()

      cy.get('.blog').eq(0).should('contain', 'The Finale')
      cy.get('.blog').eq(1).should('contain', 'The Sequel')
    })
  })
})