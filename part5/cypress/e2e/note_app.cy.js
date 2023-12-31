
describe('Note app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'user1',
      password: 'user1pwd'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('then example', function () {
    cy.get('button').then(buttons => {
      console.log('number of buttons', buttons.length)
      cy.wrap(buttons[0]).click()
    })
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

  it('login fails with wrong password', () => {
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
      cy.login({ username: 'user1', password: 'user1pwd' })
    })

    it('a new note can be created', () => {
      cy.contains('new note').click()
      cy.get('#note-input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', () => {
      beforeEach(() => {
        cy.createNote({
          content: 'another note cypress',
          important: true
        })
      })

      it('it can be made not important', () => {
        cy.contains('another note cypress')
          .parent().find('button')
          .contains('make not important')
          .click()
        cy.contains('another note cypress')
          .parent()
          .contains('make important')
      })
    })

    describe('and several notes exist', () => {
      beforeEach(() => {
        cy.createNote({ content: 'first note', importance: false })
        cy.createNote({ content: 'second note', importance: false })
        cy.createNote({ content: 'third note', importance: false })
      })

      it('one of those can be made important', () => {
        cy.contains('second note').parent().find('button').as('theButton')

        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })
})