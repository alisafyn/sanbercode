import LoginPage from "../../support/pages/loginPageAs";
import loginDataAssertion from '../../fixtures/loginDataAssertion.json';

describe('Dashboard OrangeHRM - Full Test', () => {

  beforeEach(() => {
    // Optional: intercept API untuk monitoring
    cy.intercept('GET', '**/dashboard/**').as('dashboardAPI');
  });

  it('TC001 - Dashboard header muncul setelah login', () => {
    LoginPage.visit();
    LoginPage.login(loginDataAssertion.validUsername, loginDataAssertion.validPassword);

    cy.wait('@dashboardAPI'); // tunggu API dashboard
    LoginPage.getDashboardHeader().should('be.visible').and('contain.text', 'Dashboard');
  });

  it('TC002 - Validasi URL dashboard', () => {
    LoginPage.visit();
    LoginPage.login(loginDataAssertion.validUsername, loginDataAssertion.validPassword);

    cy.wait('@dashboardAPI');
    cy.url().should('include', '/dashboard');
  });

  it('TC004 - Navigasi menu Admin', () => {
    LoginPage.visit();
    LoginPage.login(loginDataAssertion.validUsername, loginDataAssertion.validPassword);

    LoginPage.getAdminMenu().click();
    cy.url().should('include', '/admin/viewSystemUsers');
  });

  it('TC005 - Navigasi menu PIM', () => {
    LoginPage.visit();
    LoginPage.login(loginDataAssertion.validUsername, loginDataAssertion.validPassword);

    LoginPage.getPIMMenu().click();
    cy.url().should('include', '/pim/viewEmployeeList');
  });

  it('TC006 - Navigasi menu Leave', () => {
    LoginPage.visit();
    LoginPage.login(loginDataAssertion.validUsername, loginDataAssertion.validPassword);

    LoginPage.getLeaveMenu().click();
    cy.url().should('include', '/leave/viewLeaveList');
  });

  it('TC007 - Navigasi menu Time', () => {
    LoginPage.visit();
    LoginPage.login(loginDataAssertion.validUsername, loginDataAssertion.validPassword);

    LoginPage.getTimeMenu().click();
    cy.url().should('include', '/time/viewEmployeeTimesheet');
  });

  it('TC008 - Validasi user dropdown muncul', () => {
    LoginPage.visit();
    LoginPage.login(loginDataAssertion.validUsername, loginDataAssertion.validPassword);

    LoginPage.getUserDropdown().should('be.visible');
  });

  it('TC009 - Klik user dropdown menampilkan Logout', () => {
    LoginPage.visit();
    LoginPage.login(loginDataAssertion.validUsername, loginDataAssertion.validPassword);

    LoginPage.getLogoutLink().should('be.visible');
  });

});
