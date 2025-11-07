import LoginPage from "../../support/pages/loginPageAs";
import loginDataAssertion from '../../fixtures/loginDataAssertion.json';

describe('Forgot Password OrangeHRM', () => {
    beforeEach(() => {
  cy.intercept('POST', '**/auth/requestResetPassword').as('requestResetPassword');
  cy.intercept('GET', '**/auth/sendPasswordReset').as('sendPasswordReset');
  cy.intercept('GET', '**/auth/login').as('cancelResetPassword');
});

 it('TC001 - Lupa password tampil halaman reset', () => {
    LoginPage.visit();
    LoginPage.clickForgotPassword();
    cy.url().should('include', 'requestPasswordReset');
    LoginPage.getResetPasswordButton().should('be.visible');
  });


  it('TC002 - Email kosong', () => {
    LoginPage.visit();
    LoginPage.clickForgotPassword();
    LoginPage.getResetPasswordButton().click();
    LoginPage.getErrorMessage1().should('contain.text', 'Required');
  });

  it('TC003 - Cancel forgot password', () => {
    LoginPage.visit();
    LoginPage.clickForgotPassword();
    LoginPage.getCancelResetPasswordButton().click();
    cy.wait('@cancelResetPassword').its('response.statusCode').should('eq', 200);

    cy.url().should('include', '/auth/login');
  });

  it('TC004 - Reset password dengan email valid', () => {
    LoginPage.visit();
    LoginPage.clickForgotPassword();
    LoginPage.getForgotPasswordEmailField().type(loginDataAssertion.validUsername);
    LoginPage.getResetPasswordButton().click();
    
    cy.wait('@requestResetPassword').its('response.statusCode').should('eq', 302);
    cy.wait('@sendPasswordReset').its('response.statusCode').should('eq', 200);

    LoginPage.getForgotPasswordSuccessMessage().should('be.visible').and('contain.text', 'Reset Password link sent successfully');
  });

});
