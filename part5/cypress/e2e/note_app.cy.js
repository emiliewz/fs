describe('Note app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'user1',
      password: 'user1pwd'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', () => {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('login form can be opened', () => {
    cy.contains('log in').click()
  })

  it('user can login', () => {
    cy.contains('log in').click()
    cy.get('#username').type('user1')
    cy.get('#password').type('user1pwd')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged in')
  })

  it.only('login fails with wrong password', () => {
    cy.contains('log in').click()
    cy.get('#username').type('user1')
    cy.get('#password').type('user1')
    cy.get('#login-button').click()

    // cy.get('.error').contains('Wrong credentials')
    cy.get('.error').should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    // cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    // cy.get('.error').should('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.contains('log in').click()
      cy.get('#username').type('user1')
      cy.get('#password').type('user1pwd')
      cy.get('#login-button').click()
    })

    it('a new note can be created', () => {
      cy.contains('new note').click()
      cy.get('#note-input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', () => {
      beforeEach(() => {
        cy.contains('new note').click()
        cy.get('input').type('another note cypress')
        cy.contains('save').click()
      })

      it('it can be made not important', () => {
        cy.contains('another note cypress')
          .contains('make not important')
          .click()
        cy.contains('another note cypress')
          .contains('make important')
      })
    })
  })
})