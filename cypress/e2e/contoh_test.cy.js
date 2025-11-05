const dataLogin = [
  { username: 'Admin', password: 'admin123' },
  { username: 'Admin', password: 'salah' },
  { username: 'User1', password: '123456' }
]

describe('Login test dengan banyak data', () => {
  dataLogin.forEach((data) => {
    it(`Login dengan ${data.username}/${data.password}`, () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      cy.get('input[name="username"]').type(data.username)
      cy.get('input[name="password"]').type(data.password)
      cy.get('button.orangehrm-login-button').click()
      cy.wait(2000)
    })
  })
})
