/* eslint-disable max-len */
/**
 * test scenario
 *
 * - Login spec cypress
 *  - should display login page correctly
 *  - should display alert when clicked Login Button if form is empty
 *  - should display alert when clicked Login Button if password is empty
 *  - should display alert when clicked Login Button if username or password is wrong
 *  - should display homepage when username and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.get('header span').contains('Login').click();
  });

  it('should display login page correctly', () => {
    cy.get('#email').should('be.visible');
    cy.get('input[placeholder="******"]').should('be.visible');
    cy.get('#loginUser').should('be.visible');
  });

  it('should display alert when clicked Login Button if form is empty', () => {
    cy.get('#loginUser').click();
    cy.on('window:alert', (str) => {
      expect(str).toBe('"email" is not allowed to be empty');
    });
  });

  it('should display alert when clicked Login Button if password is empty', () => {
    cy.get('#email').type('testuser@email.com');

    cy.get('#loginUser').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when clicked Login Button if username or password is wrong', () => {
    cy.get('#email').type('testuser@email.com');
    cy.get('input[placeholder="******"]').type('salah');

    cy.get('#loginUser').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when username and password are correct', () => {
    cy.get('#email').type('maulana@gmail.com');
    cy.get('input[placeholder="******"]').type('maulana123');

    cy.get('#loginUser').click();

    cy.get('nav').contains(/^Home$/).should('be.visible');
    cy.get('button').contains('Logout').should('be.visible');
  });
});
