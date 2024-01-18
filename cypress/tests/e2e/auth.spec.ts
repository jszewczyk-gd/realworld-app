import { faker } from '@faker-js/faker';
import users from '../../fixtures/users.json';

describe('User authentication', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  context('given valid user account credentials', () => {
    it('logs in the user', () => {
      cy.login(users.testuser.username, users.testuser.password);
      cy.get('@loginUser').then((loginUser: any) => {
        expect(loginUser.response.statusCode).to.be.eq(200)
      });
    });
  });

  context('given new unique credentials', () => {
    const newUserData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      username: `user${Date.now()}`,
      password: faker.internet.password()
    };
    
    it('creates the new account', () => {
      cy.register(newUserData.firstName, newUserData.lastName, newUserData.username, newUserData.password);
      cy.login(newUserData.username, newUserData.password);
      cy.get('@loginUser').then((loginUser: any) => {
        expect(loginUser.response.statusCode).to.be.eq(200)
      });
      cy.database("filter", "users", { username: newUserData.username, firstName: newUserData.firstName, lastName: newUserData.lastName})
        .should('have.length', 1);
    })
  });
})