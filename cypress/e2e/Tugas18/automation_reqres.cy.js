describe('Automation API Reqres.in dengan Custom Command', () => {
  it('TC01 - GET list users', () => {
    cy.apiRequest('GET', '/users?page=2').then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.data.length).to.be.greaterThan(0)
    })
  })

  it('TC02 - GET single user', () => {
    cy.apiRequest('GET', '/users/2').then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.data.id).to.eq(2)
    })
  })

  it('TC03 - GET user not found', () => {
    cy.apiRequest('GET', '/users/23', {}, false).then((res) => {
      expect(res.status).to.eq(404)
    })
  })

  it('TC04 - POST create user', () => {
    cy.apiRequest('POST', '/users', { name: 'Anisa', job: 'QA' }).then((res) => {
      expect(res.status).to.eq(201)
      expect(res.body.name).to.eq('Anisa')
    })
  })

  it('TC05 - PUT update user', () => {
    cy.apiRequest('PUT', '/users/2', { name: 'Anisa', job: 'QA Senior' }).then((res) => {
      expect(res.status).to.eq(200)
    })
  })

  it('TC06 - PATCH update user', () => {
    cy.apiRequest('PATCH', '/users/2', { job: 'Automation Tester' }).then((res) => {
      expect(res.status).to.eq(200)
    })
  })

  it('TC07 - DELETE user', () => {
    cy.apiRequest('DELETE', '/users/2').then((res) => {
      expect(res.status).to.eq(204)
    })
  })

  it('TC08 - POST register user success', () => {
    cy.apiRequest('POST', '/register', { email: 'eve.holt@reqres.in', password: 'pistol' }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property('token')
    })
  })

  it('TC09 - POST register user failed (missing password)', () => {
    cy.apiRequest('POST', '/register', { email: 'sydney@fife' }, false).then((res) => {
      expect(res.status).to.eq(400)
      expect(res.body.error).to.eq('Missing password')
    })
  })
})
