import LoginPage from "../../support/pages/loginPageAs";
import loginDataAssertion from '../../fixtures/loginDataAssertion.json';

describe('Login OrangeHRM dengan POM', () => {
beforeEach(() => {
  cy.intercept('POST', '**/auth/validate').as('loginRequest');
});

  it('TC001 - Login dengan username dan password valid', () => {
    LoginPage.visit();
    cy.wait(1000);
    LoginPage.getUsernameField().type(loginDataAssertion.validUsername);
    LoginPage.getPasswordField().type(loginDataAssertion.validPassword);

    // Klik tombol login
    LoginPage.getLoginButton().click();
    cy.wait('@loginRequest').its('response.statusCode').should('be.oneOf', [200, 302])


    // Validasi berhasil login
    cy.url().should('include', '/dashboard');
    cy.get('h6').should('contain.text', 'Dashboard');
  });

  it('TC002 - Login dengan username salah', () => {
    LoginPage.visit();
    cy.wait(1000);
    LoginPage.getUsernameField().type(loginDataAssertion.invalidUsername);
    LoginPage.getPasswordField().type(loginDataAssertion.validPassword);

    LoginPage.getLoginButton().click();
    cy.wait('@loginRequest').its('response.statusCode').should('be.oneOf', [200, 302])


    // Validasi error message
    LoginPage.getErrorMessage().should('contain.text', 'Invalid credentials');
  });

  it('TC003 - Login dengan password salah', () => {
    LoginPage.visit();
    cy.wait(10000);
    LoginPage.getUsernameField().type(loginDataAssertion.validUsername);
    LoginPage.getPasswordField().type(loginDataAssertion.invalidPassword);

    LoginPage.getLoginButton().click();
    cy.wait('@loginRequest').its('response.statusCode').should('be.oneOf', [200, 302])


    // Validasi error message
    LoginPage.getErrorMessage().should('contain.text', 'Invalid credentials');
  });

  it('TC004 - Login dengan username dan password salah', () => {
    LoginPage.visit();
    cy.wait(1000);
    LoginPage.getUsernameField().type(loginDataAssertion.invalidUsername);
    LoginPage.getPasswordField().type(loginDataAssertion.invalidPassword);

    LoginPage.getLoginButton().click();
    cy.wait('@loginRequest').its('response.statusCode').should('be.oneOf', [200, 302])


    // Validasi error message
    LoginPage.getErrorMessage().should('contain.text', 'Invalid credentials');
  });

});
