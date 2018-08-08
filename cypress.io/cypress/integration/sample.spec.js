describe('CYPRESS: Example Tests', function() {
  it('Verify React Installation', function() {
    cy.visit('/')
    cy.get('h1.App-title').should('contain', 'Welcome to React')
  })

  it('Set Cookie', function() {
    cy.setCookie('cypressUser', 'JohnCottam')
  })
})
