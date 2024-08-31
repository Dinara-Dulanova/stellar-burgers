describe('', function () {
  beforeEach(function() {
    cy.visit('http://localhost:4000/');
    cy.intercept('GET', 'api/ingedients', { fixture: 'ingredients.json' });
  });
});

describe('add all ingredients', function() {
  it('add bun', function() {
    // cy.get('[data-cy="643d69a5c3f7b9001cfa093c"]').contains('Добавить').click();
    cy.get('[data-cy="bun"]')
      .find('button')
      .click({ force: true });
  });
});
