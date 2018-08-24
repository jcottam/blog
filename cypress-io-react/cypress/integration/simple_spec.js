describe('OMDB API', function() {
  it('Verify OMDB API is Functioning', function() {
    cy.request('https://www.omdbapi.com/?i=tt3896198&apikey=9733f1df')
  })
})

describe('Application UI', function() {
  beforeEach(function() {
    cy.visit('/')
  })

  it('Verify Application Installation', function() {
    cy.get('[data-cy=header]').should('contain', 'Testing with Cypress.io')
  })

  it('Verify Movie Grid Populates w/ 10 Movies', function() {
    cy.get('.movie-item').should('have.length', 10)
  })

  it('Click Movie, Expect Title', function() {
    cy.get('[data-cy=movie-3]').click()
    cy.get('[data-cy=selected-movie] .title').contains('Gone Girl')
  })

  it('Click Movie, Expect Release Date', function() {
    cy.get('[data-cy=movie-6]').click()
    cy.get('[data-cy=selected-movie] .release-date').contains('01 Oct 1993')
  })
})

describe('Mobile (iPhone 6)', function() {
  beforeEach(function() {
    cy.viewport('iphone-6')
    cy.visit('/')
  })

  it('Grid is Responsive, Expect 1 Movie per row', function() {
    cy.get('.movie-item')
      .should('be.visible')
      .and('have.css', 'flex-basis', '100%')
  })

  it('Save Screenshot', function() {
    cy.screenshot({ capture: 'viewport' })
  })
})
