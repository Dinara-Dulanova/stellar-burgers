const dataCyBun = "643d69a5c3f7b9001cfa093c";
const dataCyIngredient = "643d69a5c3f7b9001cfa0941";
const testUrl = "http://localhost:4000/"
describe('', function () {
  beforeEach(function() {
    cy.visit(`${testUrl}`);
    cy.intercept('GET', 'api/ingedients', { fixture: 'ingredients.json' });
  });


  describe('add all ingredients', function() {
    it('add bun', function() {
      cy.get(`[data-cy=${dataCyBun}]`).contains('Добавить').click({ force: true });
      cy.get('[data-cy="bun"]').should('contain', 'Краторная булка N-200i');
      cy.get('.constructor-element__text').should('contain', 'Краторная булка N-200i');
    });

    it('add ingredient', function() {
      cy.get(`[data-cy=${dataCyIngredient}]`).contains('Добавить').click({ force: true });
      cy.get('[data-cy="ingredient"]').should('contain', 'Биокотлета из марсианской Магнолии');
      cy.get('.constructor-element__text').should('contain', 'Биокотлета из марсианской Магнолии');
    });
  });


  describe('modal', function() {
    it('open ingredient modal', function() {
      cy.get(`[data-cy=${dataCyIngredient}]`).click();
      cy.get('[data-cy="ingredient-modal"]').should('contain', 'Детали ингредиента');
    });

    it('close ingredient modal by cross', function() {
      cy.get(`[data-cy=${dataCyIngredient}]`).click();   //открыли модалку
      cy.get('[data-cy="close-modal"]').click();  //кликнули на крестик
      cy.get('[data-cy="ingredient-modal"]').should('not.exist');  //проверяем что нет ингредиента с атрибутом ingredient-modal
    });

    it('close ingredient modal by overlay', function() {
      cy.get(`[data-cy=${dataCyIngredient}]`).click();   //открыли модалку
      cy.get('[data-cy="overlay-modal"]').click({ force: true });
      cy.get('[data-cy="ingredient-modal"]').should('not.exist');  //проверяем что нет ингредиента с атрибутом ingredient-modal
    });
  });


  describe('create order', function() {
    beforeEach(() => {
      cy.fixture('user').then(userMock => {
        cy.setCookie('accessToken', userMock.accessToken);
        localStorage.setItem('refreshToken', userMock.refreshToken);
      });
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');

      // процесс авторизации
      cy.get('[data-cy="login"]').click();
      cy.get(
        ':nth-child(1) > .input__container > .input > .input__placeholder'
      ).type('dulanovav@mail.ru');
      cy.get(
        ':nth-child(2) > .input__container > .input > .input__placeholder'
      ).type('123qwe');
      cy.get('button').contains('Войти').click();
      cy.get('[data-cy="login"]').should('contain.text', 'Dinara123');
      cy.get('[data-cy="constructor"]').click();
    });

    it('create order', function() { //Собирается бургер
      cy.get(`[data-cy=${dataCyBun}]`).contains('Добавить').click({ force: true });
      cy.get(`[data-cy=${dataCyIngredient}]`).contains('Добавить').click({ force: true });
      cy.get('[data-cy="burger-price"]').invoke('text').then(priceText => {  //собран, так как цена больше 0
        expect(parseInt(priceText.trim(), 10)).to.be.greaterThan(0);
      });
      cy.contains('Оформить заказ').click();
      cy.intercept('POST', 'api/orders', { fixture: 'create_order.json' });
      cy.get('#modals').contains('1');
      cy.get('[data-cy="close-modal"]').click();  //кликнули на крестик
      cy.get('xqsNTMuGR8DdWtMkOGiM').should('not.exist');  //что модалки с номером оформленного заказа нет
      cy.get('[data-cy="burger-price"]').invoke('text').should('eq', '0');  //конструктор пуст
    });
  });
});
