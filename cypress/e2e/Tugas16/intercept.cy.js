describe('TC01 - Login dengan kredensial valid', () => {
  
  beforeEach(() => {
    Cypress.config('defaultCommandTimeout', 100000) // 10 detik
  })

  it('Berhasil login dengan username dan password valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')

    cy.intercept('POST', '**/auth/validate').as('loginRequest')
    cy.get('button[type="submit"]').click()

    // Tambahan timeout pada wait agar tidak cepat error
    cy.wait('@loginRequest', { timeout: 100000 })
      .its('response.statusCode')
      .should('be.oneOf', [200, 302])

    cy.wait(1000) 
    cy.url().should('include', '/dashboard')
  })

  it('Menampilkan pesan error saat username salah', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.get('input[name="username"]').type('usernamesalah')
    cy.get('input[name="password"]').type('admin123')

    cy.intercept('POST', '**/auth/validate').as('invalidUsername')
    cy.get('button[type="submit"]').click()

    cy.wait('@invalidUsername', { timeout: 100000 })
      .its('response.statusCode')
      .should('be.oneOf', [200, 302])

    cy.wait(1000)
    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  })

  it('Menampilkan pesan error saat password salah', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('wrongpass')

    cy.intercept('POST', '**/auth/validate').as('invalidPassword')
    cy.get('button[type="submit"]').click()

    cy.wait('@invalidPassword', { timeout: 100000 })
      .its('response.statusCode')
      .should('be.oneOf', [200, 302])

    cy.wait(1000)
    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  })

 it('TC04 - Login dengan username dan password salah', () => {
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

  cy.location('pathname', { timeout: 15000 }).should('include', '/auth/login')
  cy.contains('Login', { timeout: 15000 }).should('be.visible')

  cy.get('input[placeholder="Username"]', { timeout: 15000 }).type('salahusername')
  cy.get('input[placeholder="Password"]', { timeout: 15000 }).type('salahpwd')

  cy.intercept('POST', '**/auth/validate').as('invalidLogin')
  cy.get('button[type="submit"]').click()

  cy.wait('@invalidLogin', { timeout: 20000 })
    .its('response.statusCode')
    .should('be.oneOf', [200, 302])

  cy.get('.oxd-alert-content-text', { timeout: 20000 })
    .should('contain', 'Invalid credentials')
})

it('TC05 - Verifikasi request GET /dashboard/index setelah login', () => {
  cy.intercept('GET', '**/dashboard/index').as('dashboard')

  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  cy.get('input[name="username"]').type('Admin')
  cy.get('input[name="password"]').type('admin123')
  cy.get('button[type="submit"]').click()

  cy.wait('@dashboard').its('response.statusCode').should('eq', 200)
})

})
