describe('Note app', () => {
  beforeEach(() => {
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
})