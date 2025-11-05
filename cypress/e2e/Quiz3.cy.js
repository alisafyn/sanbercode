describe('OrangeHRM Login Feature', () => {
  
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  it('TC01 - Login dengan username dan password valid', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard')
  })

  it('TC02 - Login dengan username salah', () => {
    cy.get('input[name="username"]').type('usernamesalah')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
  })

  it('TC03 - Login dengan password salah', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('wrongpass')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
  })

  it('TC04 - Login tanpa mengisi username dan password', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-input-group__message').should('contain', 'Required')
  })

  it('TC05 - Login tanpa mengisi username', () => {
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-input-group__message').should('contain', 'Required')
  })

    it('TC06 - Login tanpa mengisi password', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-input-group__message').should('contain', 'Required')
  })

    it('TC07 - Login dengan username dan password salah', () => {
    cy.get('input[name="username"]').type('salahusername')
    cy.get('input[name="password"]').type('salahpwd')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
  })

  it('TC08 - Cek tombol login aktif setelah input lengkap', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').should('be.enabled')
  })

})
