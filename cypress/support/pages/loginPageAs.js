// cypress/support/pages/loginPage.js

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
    // Forgot Password
  clickForgotPassword() {
    return cy.get('.orangehrm-login-forgot-header').click();
  }

  getForgotPasswordEmailField() {
    return cy.get('input[name="username"]');
  }
    getErrorMessage1() {
    // pesan error input kosong di form login/forgot biasanya pakai ini
    return cy.get('.oxd-input-field-error-message');
    }

  getResetPasswordButton() {
    return cy.get('button[type="submit"]');
  }

 getForgotPasswordSuccessMessage() {
  return cy.get('.orangehrm-forgot-password-title');
}

getCancelResetPasswordButton() {
  return cy.get('button[type="button"]').contains('Cancel');
}

  // Dashboard
    getDashboardHeader() {
    return cy.get('h6'); // header Dashboard
  }

  getMainContent() {
    return cy.get('.oxd-main-content'); // konten utama dashboard
  }

  getUserDropdown() {
    return cy.get('.oxd-userdropdown-name');
  }

  clickLogout() {
    this.getUserDropdown().click(); // buka dropdown
    cy.get('.oxd-dropdown-menu').contains('Logout').click(); // klik logout
  }

  getLogoutLink() {
    this.getUserDropdown().click(); // buka dropdown
    return cy.get('.oxd-dropdown-menu').contains('Logout');
  }

  // ===== Menu Sidebar =====
  getAdminMenu() {
    return cy.get('.oxd-sidepanel-body').contains('Admin');
  }

  getPIMMenu() {
    return cy.get('.oxd-sidepanel-body').contains('PIM');
  }

  getLeaveMenu() {
    return cy.get('.oxd-sidepanel-body').contains('Leave');
  }

  getTimeMenu() {
    return cy.get('.oxd-sidepanel-body').contains('Time');
  }

  getRecruitmentMenu() {
    return cy.get('.oxd-sidepanel-body').contains('Recruitment');
  }

  getPerformanceMenu() {
    return cy.get('.oxd-sidepanel-body').contains('Performance');
  }

  getDashboardMenu() {
    return cy.get('.oxd-sidepanel-body').contains('Dashboard');
  }

  // ===== Optional: helper untuk toast / notifications =====
  getToastMessage() {
    return cy.get('.oxd-text--toast');
  }
}

export default new LoginPage()
