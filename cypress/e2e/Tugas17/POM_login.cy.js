// cypress/e2e/tugas17/pom_login.cy.js

import loginPage from '../../support/pages/loginPage'

describe('Login OrangeHRM dengan POM', () => {

  let loginData

  before(() => {
    // Load data dari fixtures
    cy.fixture('loginData').then((data) => {
      loginData = data
    })
  })

  beforeEach(() => {
    loginPage.visit()
    cy.wait(2000)
  })

  it('TC01 - Login dengan kredensial valid', () => {
    loginPage.login(loginData.validUser.username, loginData.validUser.password)
    cy.url().should('include', '/dashboard')
  })

  it('TC02 - Login dengan username salah', () => {
    loginPage.login(loginData.invalidUser.username, loginData.validUser.password)
    loginPage.getErrorMessage().should('contain', 'Invalid credentials')
  })

  it('TC03 - Login dengan password salah', () => {
    loginPage.login(loginData.validUser.username, loginData.invalidUser.password)
    loginPage.getErrorMessage().should('contain', 'Invalid credentials')
  })

  it('TC04 - Login tanpa mengisi username', () => {
    loginPage.login(loginData.emptyUser.username, loginData.emptyUser.password)
    loginPage.getRequiredMessage().should('contain', 'Required')
  })

  it('TC05 - Login tanpa mengisi password', () => {
    loginPage.login(loginData.emptyPassword.username, loginData.emptyPassword.password)
    loginPage.getRequiredMessage().should('contain', 'Required')
  })
})
