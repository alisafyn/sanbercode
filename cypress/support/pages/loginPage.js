class LoginPage {
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  }

  getUsernameField() {
    return cy.get('input[name="username"]')
  }

  getPasswordField() {
    return cy.get('input[name="password"]')
  }

  getLoginButton() {
    return cy.get('button[type="submit"]')
  }

  getErrorMessage() {
    return cy.get('.oxd-alert-content-text')
  }

  getRequiredMessage() {
    return cy.get('.oxd-input-group__message')
  }

  login(username, password) {
    if (username) this.getUsernameField().type(username)
    if (password) this.getPasswordField().type(password)
    this.getLoginButton().click()
  }
}

export default new LoginPage()
