// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// ✅ Tambahkan base URL dan header default
Cypress.Commands.add('apiRequest', (method, endpoint, body = {}, failOnStatusCode = true) => {
  const baseUrl = 'https://reqres.in/api'
  const headers = { 'x-api-key': 'reqres-free-v1' } // bisa ganti nama API key

  return cy.request({
    method,
    url: `${baseUrl}${endpoint}`,
    headers,
    body,
    failOnStatusCode
  })
})
